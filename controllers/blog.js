const BlogPosts = require('../models/blog')


const getAllBlogPost = async (req, res) => {
    try {
        const blogPosts = await BlogPosts.find ();
        res.status(200).json(blogPosts)
    } catch (error) {
        res.status(501).json({error: 'blogpost not found'})
    }
}
    const getBlogPostById = async (req, res) => {
        try {
            const blogPost = await BlogPosts.findById(req.params.id);
            if(!blogPost) {
                return res.status(404).json({error: 'blogpost not found'})
            }
            res.json(blogPost)
        } 
        catch (error) {
            res.status(404).json({error: 'Server error' })
        }
    }
    const createBlog = async (req, res) => {
        try {
            const { title, content} = req.body;
            const blogPost = new BlogPosts ({title, content})
            await blogPost.save();
            res.status(200).json(blogPost)
        } catch (error) {
            res.status(500).json({error: 'server error'})
        }
    }
    const updateBlogPost = async (req, res) => {
        try {
            const {title, content} = req.body;
    const blogPost = await BlogPosts.findById(req.params.id)
    if(!blogPost) {
        return res.status(404).json({error: 'blogpost not found'})
    }
    blogPost.title = title || blogPost.title
    blogPost.content = content || blogPost.content

    await blogPost.save()
    res.status(200).json(blogPost)
        } catch (error) {
            res.status(500).json({error: 'server error'})
        }
    }
    
    const deleteBlogPost = async (req, res) => {
        try {
            const blogPost = await BlogPosts.findById(req.params.id)
            if(!blogPost) {
                res.status(404).json({error: 'blogpost not found'})
            }
            await blogPost.remove();
            res.status(200).json({message: 'blogpost deleted successfully'})
        } catch (error) {
            res.status(404).json({error: 'server error'});
        }
    }

    module.exports = {
        getAllBlogPost,
        getBlogPostById,
        createBlog,
        updateBlogPost,
        deleteBlogPost
    }


