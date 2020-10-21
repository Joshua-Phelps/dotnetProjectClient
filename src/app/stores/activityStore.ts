import { action, makeAutoObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({enforceActions: 'always'})

class ActivityStore {
    activityRegistry = new Map();
    activities: IActivity[] = [];
    selectedActivity: IActivity | null | undefined = null 
    loadingInitial = false;
    editMode = false;
    submitting = false;
    target = ''

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    constructor(){
        makeAutoObservable(this)
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })
        } catch (err) {
            runInAction(() => this.loadingInitial = false);
            console.log(err)
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true ;
        try {
            await agent.Activities.create(activity)
            this.activityRegistry.set(activity.id, activity)
            this.editMode = false
            this.submitting = false 
        } catch (err) {
            this.submitting = false 
            console.log(err)
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true 
        try {
            await agent.Activities.update(activity)
            this.activityRegistry.set(activity.id, activity)
            this.selectedActivity = activity
            this.editMode = false
            this.submitting = false 
        } catch (err) {
            this.submitting = false 
            console.log(err)
        }
    }

    @action deleteActivity = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = e.currentTarget.name
        try {
            await agent.Activities.delete(id);
            this.activityRegistry.delete(id)
            this.submitting = false 
            this.target = ''
        } catch (err) {
            this.submitting = false 
            this.target = ''
            console.log(err);
        }
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true 
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = null
    }

    @action cancelFormOpen= () => {
        this.editMode = false
    }

    @action openCreateForm = () => {
        this.editMode = true 
        this.selectedActivity = null 
    }
}

export default createContext(new ActivityStore())