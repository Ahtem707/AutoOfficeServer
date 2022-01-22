import { Register, UpdateUser, UpdateUserLastEntry, Login, GetBirthday, GetUserRoles } from "./user.js";
import { AddNew, GetNews } from "./news.js";
import { AddEvent, GetEvents } from "./events.js";
import { GetMyDevices, AddMyDevice } from "./myDevices.js"

export const main = (req, res) => {
    console.log("backend Main request")
    const data = req.body;
    if (data.session) {
        console.log("session true")
    }

    switch (data.method) {
        case 'createUser':
            Register(req, res)
            break
        case 'loginUser':
            Login(req, res)
            break
        case 'updateUser':
            UpdateUser(req, res)
            break
        case 'updateUserLastEntry':
            UpdateUserLastEntry(req, res)
            break
        case 'getBirthdays':
            GetBirthday(req, res)
            break
        case 'getUserRoles':
            GetUserRoles(req, res)
            break
        case 'addNew':
            AddNew(req, res)
            break
        case 'getNews':
            GetNews(req, res)
            break
        case 'addEvent':
            AddEvent(req, res)
            break
        case 'getEvents':
            GetEvents(req, res)
            break
        case 'addMyDevice':
            AddMyDevice(req, res)
            break
        case 'getMyDevices':
            GetMyDevices(req, res)
            break
    }
}