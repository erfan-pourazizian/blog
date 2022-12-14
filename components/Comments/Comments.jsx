import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment'
import parse from 'html-react-parser'

import { getComments } from '../../services'

const Comments = ({ slug }) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
    }, [slug])

    return (
        <>
            {comments.length > 0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
                    <h3 className='text-3xl mb-8 font-semibold border-b pb-4'>
                        {comments.length}
                        {' '}
                        کامنت
                    </h3>
                    {comments.map((comment) => (
                        <div key={comment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
                            <p className='text-base mb-1'>
                                <span className='text-xl font-semibold'>{comment.name}</span>
                                {'  '}
                                {moment(comment.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                            </p>
                            <p className='text-xl whitespace-pre-line text-gray-600 w-full'>{parse(comment.comment)}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Comments
