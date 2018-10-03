import React from 'react';
import './Friends.css';
import Friend from './Friend/Friend';

const friendsList = [
    'https://ed.team/sites/default/files/styles/16_9_medium/public/2017-10/happy.jpg?itok=FHd0TtSb',
    'https://www.xing.com/image/9_2_9_4145b0df6_30335606_1/nicolas-rosa-foto.256x256.jpg',
    'https://3.bp.blogspot.com/-0XRY66NBbVU/WLbZsgQEgkI/AAAAAAAAACQ/rr9FFLBUvD0bgYPNR4n6wCeQkSxhtA1IACK4B/w400-h266-p/thinking-girl.jpg',
    'http://marinovlaw.ru/wp-content/uploads/2015/07/7-kunci-sukses-membangun-bisnis-baru-360x240.jpg',
    'http://www.hurdfamilydental.net/uploads/9/7/2/4/97247460/published/african-american-1180847-1920.jpg?1489201727',
    'https://i0.hippopx.com/photos/381/16/19/young-man-person-guy-thumb.jpg',
    'https://i.stack.imgur.com/Eigf9.jpg?s=328&g=1',
    'http://ruzoo.ru/wp-content/uploads/2014/09/557.jpg',
    'https://scoop.thetypicalindian.in/wp-content/uploads/2017/10/istock-627909282-0.jpg'
];

const friends = (props) => {
    const friendsCopyList = friendsList.slice();

    return (
        <div className="friends">
            <div className="friends-wrapper">
                {
                    friendsCopyList.map((f, id) => (
                        <Friend key={ f + id } friend={ f }/>
                    ))
                }
            </div>
        </div>
    );
};

export default friends;