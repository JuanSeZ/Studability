const restApiEndpoint = "http://localhost:4321"

const Studability = {

    login: (credentials, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(body => okCallback(body))
            } else {
                errorCallback("Incorrect e-mail or password")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    register: (user, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (resp.status === 201) { // code 201 means succeed
                okCallback()
            } else {
                errorCallback()
            }
        })
    },

    logout: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/auth`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            },
        }).then(resp => {
            if (resp.status === 200) {
                 okCallback()
            } else {
                errorCallback("Error Can't logout")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    addEvent: (credentials, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/home/calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            },
            body: JSON.stringify(credentials)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(addedEvent => okCallback(addedEvent))
            } else {
                errorCallback("The event has not been added")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listEvents: (token, okCallback, errorCallback) => {
        fetch('http://localhost:4321/home/calendar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(events => okCallback(events))
            } else {
                errorCallback("Events cannot be listed")
            }
        })
    }

}
export const useStudability = () => Studability
