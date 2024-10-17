
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    getDocs,
    where,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {
    v4 as uuidv4
} from "https://cdn.jsdelivr.net/npm/uuid@10.0.0/+esm";
import ActionPanel from "./productivity/prod/action-panel/action-panel.js";
import {
    getUser
} from "./user.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAaPK5LGpwMwppDDWQmJHMQaoHXaWMs6s",
    authDomain: "portfolio-website-8888d.firebaseapp.com",
    databaseURL: "https://portfolio-website-8888d-default-rtdb.firebaseio.com",
    projectId: "portfolio-website-8888d",
    storageBucket: "portfolio-website-8888d.appspot.com",
    messagingSenderId: "259486632559",
    appId: "1:259486632559:web:85906067817132b0841b9a",
    measurementId: "G-CZYB3D4LTP"
};
// firebase app
const app = initializeApp(firebaseConfig);

//firebase db
const database = getFirestore(app);


const getCalendarStartDate = () => {
    let date  = new Date();
    return new Date(date.getFullYear(), 0, 1);
}

const getDate = () => {
    return new Date();
}
const storeStatus = async (data, docId = null) => {
    if (docId) {
        let docRef = doc(database, "status", docId);
        return await updateDoc(docRef, data);

    }
    return await addDoc(collection(database, "status"), data);
}

const getActivities = async function () {
    const q = collection(database, "activities");
    const docSnap = await getDocs(q);
    return docSnap;
};

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

async function getCurrentDateStatus() {
    let start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    let end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const q = query(collection(database, "status"),
        where('date', ">=", start),
        where('date', "<=", end));
    const docSnap = await getDocs(q);
    let data = null;
    docSnap.forEach(i => {
        data = {
            id: i.id,
            ...i.data()
        };
    });
    return data;

}
const getStatus = async function () {
    const q = query(collection(database, "status"), where('date', ">=", getCalendarStartDate()));
    const docSnap = await getDocs(q);
    let dataset = [];
    docSnap.forEach(item => {
        let data = item.data();
        data['date'] = toDateTime(data['date']['seconds']).toISOString().split('T')[0];
        dataset.push(data);
    })
    return dataset;
};

const onActivityMark = async ({
    id = null,
    ...data
}) => {
    try {
        data['date'] = getDate();
        await storeStatus(data, id);
        return {
            error: false,
            message: "Successfully added"
        }

    } catch (err) {
        console.log(err);
        return {
            error: false,
            message: err.message
        }
    }

}

export {
    getStatus,
    getCalendarStartDate,
    app,
    onActivityMark,
    getActivities,
    getCurrentDateStatus,
    database
}