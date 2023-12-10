import React from 'react'
import { useParams } from "react-router-dom"
import { useGetOneBlogQuery } from '../Services/Api_Blogs'
import parse from 'html-react-parser';

const Blog_details = () => {
    const { id } = useParams()
    const { data: blogData, isLoading } = useGetOneBlogQuery(id || "")


    return (
        <div className='w-[90vw] mx-auto mt-36'>
            <div className="blog-details-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="index.html" title="go to homepage">Home<span>/</span></a>  </li>
                                    <li><strong> blog details</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-lg-2">
                            
                        </div> */}
                        <div className="">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sidebar-title">
                                        <h2>Details Post</h2>
                                    </div>
                                    <div className="blog-area">
                                        <div className="blog-post-details">
                                            <div className="blog-img">
                                                {/* <a href="#"> */}
                                                    <img className="w-[600px] h-[500px] object-contain" src={blogData?.imgUrl[0]} alt="" />
                                                {/* </a> */}
                                            </div>
                                            <div className="blog-content">
                                                <a href="#" className="blog-title">{blogData?.title}</a>
                                                <span><a href="#">By {blogData?.author} - </a>{blogData?.createdAt} ( 0 comments )</span>
                                                {parse(blogData?.description || "")}
                                                <div className="share-post">
                                                    <div className="share-title">
                                                        <h3>share this post</h3>
                                                    </div>
                                                    <div className="share-social">
                                                        <ul>
                                                            <li><a href="#"> <i className="fa fa-facebook"></i> </a></li>
                                                            <li><a href="#"> <i className="fa fa-twitter"></i> </a></li>
                                                            <li><a href="#"> <i className="fa fa-pinterest"></i> </a></li>
                                                            <li><a href="#"> <i className="fa fa-google-plus"></i> </a></li>
                                                            <li><a href="#"> <i className="fa fa-linkedin"></i> </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="about-author">
                                                    <div className="author-img">
                                                        <img src="img/blog/admin.jpg" alt="" />
                                                    </div>
                                                    <div className="author-content">
                                                        <h3>About the Author: <a href="#">admin</a> </h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <div className="comment-box">
                                                            <div className="comment-title">
                                                                <h3>4 comments</h3>
                                                            </div>
                                                            <div className="comment-list">
                                                                <ul>
                                                                    <li>
                                                                        <div className="author-img">
                                                                            <img src="img/blog/user.jpg" alt="" />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">admin</a> Post author February 6, 2016 at 1:38 am <a href="#">Reply</a></h5>
                                                                            <p>just a nice post</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="comment-reply">
                                                                        <div className="author-img">
                                                                            <img src="img/blog/admin.jpg" alt="" />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">demo</a> Post author February 6, 2016 at 2:38 am <a href="#">Reply</a></h5>
                                                                            <p>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur</p>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="author-img">
                                                                            <img src="img/blog/user.jpg" alt="" />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">admin</a> Post author February 6, 2016 at 1:38 am <a href="#">Reply</a></h5>
                                                                            <p>just a nice post</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="comment-reply">
                                                                        <div className="author-img">
                                                                            <img src="img/blog/admin.jpg" alt="" />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">demo</a> Post author February 6, 2016 at 2:38 am <a href="#">Reply</a></h5>
                                                                            <p>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="leave-reply">
                                                            <div className="reply-title">
                                                                <h3>leave a reply</h3>
                                                            </div>
                                                            <div className="reply-form">
                                                                <p>Your email address will not be published. Required fields are marked *</p>
                                                                <form action="#">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <label> Name * </label>
                                                                            <input type="text" />
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <label> Email * </label>
                                                                            <input type="email" />
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <label> Website </label>
                                                                            <input type="text" />
                                                                        </div>
                                                                        <div className="col-md-12 text-area">
                                                                            <label> comment </label>
                                                                            <textarea cols="30" rows="10"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="post-comment">
                                                                                <button type="submit"> post a comment </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="toolbar-bottom">
                                        <ul>
                                            <li><span>Pages:</span></li>
                                            <li className="current"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#"> <img src="img/product/pager_arrow_right.gif" alt="" /> </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog_details