import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { selectComment } from '../features/comment/commentSlice'
import { selectUser } from '../features/user/userSlice'
import { Link } from 'react-router-dom'
const spiner = require ('../spiner.gif')




const Comment = ({post_id}) => {

    const { loading_comment, comments, profiles } = useSelector(selectComment)

    const { user } = useSelector(selectUser)
    const { id } = user 


    return (
        <div>
            {loading_comment===true? (<img src={spiner} alt="loading..." />) : (
                <div>
                    {comments && comments.filter(comment=> comment.post_id === post_id).map(com=>
                    <div className="comment" key={com.id}>
                        {profiles && profiles.filter(profile=> profile.user_id === com.user_id).map(prof=>
                            <div key={uuidv4()}>
                                { id===prof.user_id? (
                                    <>
                                    <p>{prof.name}</p>
                                    <img alt='' src={prof.avatar}></img>
                                    </>
                                    ) : (
                                    <Link to={`/contact/${prof.user_id}`}>
                                    <p>{prof.name}</p>
                                    <img alt='' src={prof.avatar}></img>
                                    </Link>
                                ) } 
                            </div>
                        )}
                        <h6>{com.comment}</h6>
                    </div>)}
                </div>
            )}
        </div>
    )
}

export default Comment
