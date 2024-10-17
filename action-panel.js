import {
    add
} from './productivity/add.template.js'
import Mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/+esm';
export default class ActionPanel {
    elem;

    setActivities(activities) {
        let data = [];
        activities.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });

        })
        this.activities = data;
        this.elem = document.getElementById('action-panel');
    }

    setCurrentState(cs) {
        this.cs = cs
    }

    enable({
        onActivityAdd
    }) {
        let template = add();
        let activitiesChecked = []
        if (this.cs) {
            activitiesChecked = this.cs.activities;
        }
        let updatedAc = this.activities.map(i => {
            if (activitiesChecked.indexOf(i.handle) == -1) {
                return {
                    checked: false,
                    ...i
                }
            }
            return {
                checked: true,
                ...i
            }
        })
        let rendered = Mustache.render(template, {
            activities: updatedAc,
        });
        this.elem.innerHTML = rendered;
        this.bindAction(onActivityAdd);
    }
    bindAction(onActivityAdd) {
        this.elem.querySelectorAll('form input[type="checkbox"]').forEach(item => {
            item.addEventListener("change", (ev) => {
                let data = {
                    date: null,
                    activities: []
                }
                ev.preventDefault();
                const formData = new FormData(this.elem.querySelector('#mark-activity'));
                for (const [key, value] of formData.entries()) {
                    if (value && key == 'date') {
                        data['date'] = value
                    }
                    if (value && key == 'activities') {
                        data['activities'].push(value);
                    }
                }
                data['percentage'] = (data['activities'].length / this.activities.length) * 100;
                if (this.cs) {
                    data['id'] = this.cs.id;
                }
                let {
                    error,
                    message
                } = onActivityAdd(data)
                alert(message);
                if (!error) {
                    //reset the form
                }
            })
        })
    }
}