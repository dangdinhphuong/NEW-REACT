
import { useGetAllBlogsQuery } from '../../../Services/Api_Blogs'
import { IBlog } from '../../../Models/interfaces'
import parse from 'html-react-parser';



const Blog = () => {
    const { data: blogData }:any = useGetAllBlogsQuery()

    return (
        <div className='w-[90vw] mx-auto'>
            <div className="blog-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="blog-heading">
                                <h2>From <strong> The Blog</strong></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="blog-post">
                                {blogData?.data?.map((blog: IBlog) => {
                                    return (
                                        <div className="single-blog-post relative h-[330px]">
                                            <div className="blog-img">
                                                <a href={`blog/${blog._id}/detail`}>
                                                    <img className="w-[200px] h-[200px]" src={blog.imgUrl?.[0]} />
                                                </a>
                                            </div>
                                            <div className="blog-content">
                                                <a href={`blog/${blog._id}/detail`} className="blog-title">{blog.title}</a>
                                                <span><a href="#">By {blog?.author}</a>- {blog?.createdAt} ( 0 comments )</span>
                                                <div className="h-[150px] objectfit-cover"><p className="h-[150px]" >{parse(blog?.description)}</p></div>
                                                <a href={`blog/${blog._id}/detail`} className="readmore mt-3 absolute text-black rounded ">Read more &gt;</a>
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog