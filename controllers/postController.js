const PostModel = require('../models/postModel');

exports.getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}
exports.getOnePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                post,
        }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error.message,
        })
    }
}
exports.createPost = async (req, res) => {
    try {
        const post = await PostModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                post,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}
exports.updatePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }
        );
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error.message
        })
    }
}
exports.deletePost = async (req, res) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            message: 'Post deleted successfully',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}
