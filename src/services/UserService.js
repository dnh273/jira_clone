import { baseService } from "./baseService";

export class UserService extends baseService {

    constructor(){
        super();
    }

    getUser = (keyWord) => {
        
       return this.get(`Users/getUser?keyword=${keyWord}`);
    }


    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject);
    }


    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`,userProject);
    } 


    getUserByProjectId = (idProject) =>{ 
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
    signUpUser=(userDetails) => {
        return this.post(`Users/signup`,userDetails);
    }

    editUser=(userDetails) => {
        return this.put(`Users/editUser`,userDetails);
    }
    deleteUser=(userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`);
    }
}


export const userService = new UserService();