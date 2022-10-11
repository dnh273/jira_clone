import React, { Component } from 'react'
import { baseService } from './baseService';

export default class CommentsService extends baseService {
    constructor() {
        super();
    }

    getAllComments = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }

    insertComment = (newComment) => {
        return this.post(`Comment/insertComment`, newComment);
    }
    deleteComment = (commentId) => {
        return this.delete(`Comment/deleteComment?idComment=${commentId}`);
    }
    updateComment = (commentId,commentContent) => {
        return this.put(`Comment/updateComment?id=${commentId}&contentComment=${commentContent}`);
    }
}

export const commentsService = new CommentsService();