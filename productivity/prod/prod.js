import { Controller } from "../../controller.js";
import { template  } from "./prod.template.js";
import Mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/+esm';
import {  getStatus, getCalendarStartDate, getCurrentDateStatus, getActivities, onActivityMark } from '../../config.js';
import ActionPanel from './action-panel/action-panel.js'
import { getAuth, signOut  } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'
import { app } from '../../config.js';
import { logout } from '../../user.js';

export default class ProController extends Controller {

    getEventKey(){
        return 'prod';
    }
    async getStatusAndPaintHeatMap() {
        let status = await getStatus();
        this.paintHeatmap(status)
    }
    async onActivityMark(params) {
        let res  = await onActivityMark(params);
        if(!res.error){
            this.getStatusAndPaintHeatMap();
        }
        return res;
    }

    async bind() {
        this.getStatusAndPaintHeatMap();
        document.addEventListener('heat_map_value_change', () => {
            this.getStatusAndPaintHeatMap();
        })
        const actionPanel = new ActionPanel();
        let activities = await getActivities();
        let todayData = await getCurrentDateStatus();

        actionPanel.setActivities(activities);
        actionPanel.setCurrentState(todayData);
        actionPanel.enable({
            onActivityMark: onActivityMark
        });

        this.container.querySelector(".logout").addEventListener("click", () => {
            const auth = getAuth(app);
            signOut(auth).then(() => {
                // Sign-out successful.
                this.changeTo("login");

            }).catch((error) => {
                console.log(error);
            
            });
              
            
        })
        

    }
    paintHeatmap (data) {
        this.container.querySelector('#ex-ghDay').innerHTML = "";
        var cal = new CalHeatmap();
        cal.paint({
                data: {
                    source: data,
                    type: 'json',
                    x: 'date',
                    y: d => d['percentage'],
                    groupY: 'max',
                },
                date: {
                    start: getCalendarStartDate()
                },
                range: 12,
                scale: {
                    color: {
                        type: 'threshold',
                        range: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        domain: [25, 50, 75, 100],
                    },
                },
                domain: {
                    type: 'month',
                    gutter: 4,
                    label: {
                        text: 'MMM',
                        textAlign: 'start',
                        position: 'top'
                    },
                },
                subDomain: {
                    type: 'ghDay',
                    radius: 2,
                    width: 15,
                    height: 15,
                    gutter: 4
                },
                itemSelector: this.container.querySelector('#ex-ghDay'),
            },
            [
                [
                    Tooltip,
                    {
                        text: function (date, value, dayjsDate) {
                            return (
                                (value ? value : '0') +
                                '% on ' +
                                dayjsDate.format('dddd, MMMM D, YYYY')
                            );
                        },
                    },
                ],
                [
                    LegendLite,
                    {
                        includeBlank: true,
                        itemSelector: '#ex-ghDay-legend',
                        radius: 2,
                        width: 11,
                        height: 11,
                        gutter: 4,
                    },
                ],
                [
                    CalendarLabel,
                    {
                        width: 30,
                        textAlign: 'start',
                        text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? '' : d)),
                        padding: [25, 0, 0, 0],
                    },
                ],
            ]
        );
    
        }
    render() {
        let templ = template();
        let rendered = Mustache.render(templ);
        this.container.innerHTML = rendered;
    }
}
