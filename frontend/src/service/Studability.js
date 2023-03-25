// const restApiEndpoint = "http://localhost:3001"

const Studability = {
    // login: (credentials, okCallback, errorCallback) => {
    //     fetch(`${restApiEndpoint}/auth`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     }).then(resp => {
    //         if (resp.status === 201) {
    //             resp.json().then(body => okCallback(body))
    //         } else {
    //             errorCallback("Incorrect mail or password")
    //         }
    //     }).catch(e => errorCallback("Unable to connect to Studability API"))
    // },

    register: (user, okCallback, errorCallback) => {
        fetch('http://localhost:3001/register', {
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

}

const useStudability = () => Studability

export {useStudability};
