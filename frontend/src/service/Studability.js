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
            body: "Hola",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
                'Authorization': 'Bearer ' + token
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
    },

    modifyEvent: (eventId, eventForm, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/modifyEvent/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(eventForm)
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(eventModified => okCallback(eventModified))
            } else {
                errorCallback("The event has not been modified")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    deleteEvent: (eventId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/home/calendar/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(deletedEvent => okCallback(deletedEvent))
            } else {
                errorCallback("Error, can't delete")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    addToDoTask: (task, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(task)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(addedTask => okCallback(addedTask))
            } else {
                errorCallback("The task has not been added")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listTasks: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(tasks => okCallback(tasks))
            } else {
                errorCallback("Tasks cannot be listed")
            }
        })
    },

    deleteToDoTask: (taskId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(deletedTask => okCallback(deletedTask))
            } else {
                errorCallback("The task has not been deleted")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    changeTaskName: (taskId, name, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/changeTaskName/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(name)
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(newList => okCallback(newList))
            } else {
                errorCallback("Task has not been changed")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },


    listUserByFullName: (fullName, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/listUser?search=${fullName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(users => okCallback(users))
            } else {
                errorCallback("Users with that name cannot be listed.")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listRequests: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/requests`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(requests => okCallback(requests))
            } else {
                errorCallback("The requests cannot be listed")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listSentRequests: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/sentRequests`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(sentRequests => okCallback(sentRequests))
            } else {
                errorCallback("The requests you sent cannot be listed")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listFriends: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/friends`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(friends => okCallback(friends))
            } else {
                errorCallback("The requests cannot be listed")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    sendRequest: (emailForm, token, okCallback, errorCallback) => {
        return fetch(`${restApiEndpoint}/sendRequest`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(emailForm)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback(() => "User requested")
            } else {
                errorCallback("The request cannot be sent")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    acceptRequest: (email, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/acceptRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(email)
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(requests => okCallback(requests))
            } else {
                errorCallback("Friends could not be listed.")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    rejectRequest: (emailForm, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/requests`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(emailForm)
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(requests => okCallback(requests))
            } else {
                errorCallback("Requests cannot be listed.")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    uploadFile: (formData, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/files/upload`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: 'Bearer ' + token,
                filename: formData.get("filename"),
            },
        }).then((response) => {
            if (response.status === 200) {
                okCallback();
            } else {
                throw new Error("Upload failed");
            }
        }).catch((error) => errorCallback(error));
    },

    deleteFile: (filename, token, okCallback, errorCallback) => {
        const formData = new FormData();
        formData.append("filename", filename);

        fetch(`${restApiEndpoint}/files/${filename}`, {
            method: "DELETE",
            body: formData,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.status === 200) okCallback();
            else throw new Error("Delete failed");
        }).catch((error) => errorCallback(error));
    },

    listUploadedFiles: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/files`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        }).then(async resp => {
            if (resp.status === 200) {
                let files = await resp.json()
                okCallback(files)
            } else {
                errorCallback("Files cannot be listed")
            }
        })
    },

    listFriendsFiles: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/files/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        }).then(async resp => {
            if (resp.status === 200) {
                let files = await resp.json()
                okCallback(files)
            } else {
                errorCallback("Files cannot be listed")
            }
        })
    },

    // getAuthFile: (token, okCallback, errorCallback) => {
    //     fetch(`${restApiEndpoint}/files/getAuth`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + token,
    //         }
    //     }).then(async res => {
    //         if(res.status === 200) {
    //             let file = await res.json()
    //             okCallback(file)
    //         } else{
    //             errorCallback("Unauthorized, you cannot access this file")
    //         }
    //     })
    // },

    handleDownloadSelectedFiles: (selectedFiles, token, zipName) => {
        fetch(`${restApiEndpoint}/downloadZip`, {
            method: "POST",
            body: selectedFiles.join(","),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                return response.blob(); // Get the response as a Blob
            } else {
                throw new Error('Error downloading the zip file');
            }
        })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${zipName}.zip`);
                link.click();
            })
            .catch((error) => {
                console.log("Error downloading the zip file:", error);
            });
    },

    handleDownloadSelectedFilesFriend: (selectedFiles, token, zipName) => {
        const selectedFilesArray = selectedFiles.map((file) => [file.author, file.title]);
        fetch(`${restApiEndpoint}/downloadZipFriend`, {
            method: "POST",
            body: JSON.stringify(selectedFilesArray),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                return response.blob(); // Get the response as a Blob
            } else {
                throw new Error('Error downloading the zip file');
            }
        })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${zipName}.zip`);
                link.click();
            })
            .catch((error) => {
                console.log("Error downloading the zip file:", error);
            });
    },

    deleteSelectedFiles: (selectedFiles, token) => {
        fetch(`${restApiEndpoint}/deleteSelectedFiles`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: selectedFiles.join(",")
        }).then((response) => {
            if (response.ok) {
                console.log('Files deleted successfully');
            } else {
                console.log('Files could not be deleted')
            }
        }).catch((error) => {
            // Handle network or other errors
            console.log('Error deleting files:', error);
        });
    },

    getUser: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/home`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(user => okCallback(user))
            } else {
                errorCallback("Could not get name")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    getUserIdByToken: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/editProfile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(user => okCallback(user))
            } else {
                errorCallback("Could not get user ID")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    setUser: (userForm, userId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/editProfile/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userForm)
        }).then(resp => {
            if (resp.status === 200) {
                okCallback()
            } else {
                errorCallback("Could not save changes")
            }
        })
    },

    deleteUser: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/deleteUser`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 202){
                okCallback()
            }
            else errorCallback("Could not delete account")
        })
    },

    listFriendByFullName: (fullName, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/listChatFriends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(users => okCallback(users))
            } else {
                errorCallback("Users with that name cannot be listed.")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    getConversation:(senderId, receiverId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/listChatFriends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(users => okCallback(users))
            } else {
                errorCallback("Users with that name cannot be listed.")
            }
        }).catch(e => errorCallback("Unable to connect to Studability API"))
    },

    listGroups: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/listGroups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(groups => okCallback(groups))
            } else {
                errorCallback("Groups cannot be listed.")
            }
        })
    },

    getUserNameById: (userId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/getUserNameById/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(userName => okCallback(userName))
            } else {
                errorCallback("Could not get user")
            }
        })
    },

    deleteFriend: (friendId, token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/deleteFriend/${friendId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 202){
                resp.json().then(friends => okCallback(friends))
            }
            else errorCallback("Could not delete friend")
        })
    }
}
export const useStudability = () => Studability
