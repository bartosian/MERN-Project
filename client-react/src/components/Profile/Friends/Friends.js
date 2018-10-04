import React from 'react';
import './Friends.css';
import Friend from './Friend/Friend';

const friendsList = [
    { username: 'name', url: 'https://ed.team/sites/default/files/styles/16_9_medium/public/2017-10/happy.jpg?itok=FHd0TtSb' },
    { username: 'name', url: 'https://www.xing.com/image/9_2_9_4145b0df6_30335606_1/nicolas-rosa-foto.256x256.jpg' },
    { username: 'name', url: 'https://3.bp.blogspot.com/-0XRY66NBbVU/WLbZsgQEgkI/AAAAAAAAACQ/rr9FFLBUvD0bgYPNR4n6wCeQkSxhtA1IACK4B/w400-h266-p/thinking-girl.jpg' },
    { username: 'name', url: 'http://marinovlaw.ru/wp-content/uploads/2015/07/7-kunci-sukses-membangun-bisnis-baru-360x240.jpg' },
    { username: 'name', url: 'http://www.hurdfamilydental.net/uploads/9/7/2/4/97247460/published/african-american-1180847-1920.jpg?1489201727' },
    { username: 'name', url: 'https://i0.hippopx.com/photos/381/16/19/young-man-person-guy-thumb.jpg' },
    { username: 'name', url: '' },
    { username: 'name', url: 'http://ruzoo.ru/wp-content/uploads/2014/09/557.jpg' },
    { username: 'name', url: 'https://images.wallpaperscraft.com/image/gary_lucy_man_actor_dark-haired_cardigan_person_7216_300x240.jpg' },
    { username: 'name', url: 'https://www.maison-de-la-traduction.fr/img/default-concours.jpg' },
    { username: 'name', url: 'https://pbs.twimg.com/media/CZF_gxPU8AET9zz.jpg' },
    { username: 'name', url: '' },
    { username: 'name', url: 'https://www.energylivenews.com/wp-content/uploads/2013/01/Salesman-annoying-350.jpg' },
    { username: 'name', url: 'https://claytonorthodontics.com/wp-content/uploads/2014/03/8-300x224.jpg' },
    { username: 'name', url: 'https://www.santamonicaendodontics.com/images/Fotolia_25219107_XS.jpg' },
    { username: 'name', url: '' },
    { username: 'name', url: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-03/campaign_images/crondr01/20/13/25-things-that-shouldnt-end-with-sort-of-1-24944-1395335905-10_big.jpg' },
    { username: 'name', url: 'https://consultation.spb.ru/upload/iblock/284/284acfcba3b530cda708e505c086cb57.jpg' },
    { username: 'name', url: 'http://greatlady.net/wp-content/uploads/2011/12/DhiMDE5Yj-300x205.jpg' },
    { username: 'name', url: 'http://www.networkdesigner.net/wp-content/uploads/2015/11/Tonsil-Stones-Remedy-Forever-Review-440x250.jpg' },
    { username: 'name', url: 'https://d28g7970w5bq8z.cloudfront.net/p/articles/ai-163427-aux-head-20150806_ludi_360.jpg' },
    { username: 'name', url: 'http://www.etoiledereve-animations.fr/wp-content/uploads/2014/01/anniversaire-detective.jpg' },
    { username: 'name', url: 'http://monateka.com/images/6061.jpg' },
    { username: 'name', url: 'https://im0-tub-ru.yandex.net/i?id=5779de66e079e0424ad01f06e652ac4f-sr&n=13' },
    { username: 'name', url: 'http://www.b17.ru/foto/uploaded/93e4dcd8b884e7473fc32b3594547e43.jpg' },
    { username: 'name', url: '' },
    { username: 'name', url: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-03/campaign_images/crondr01/20/13/25-things-that-shouldnt-end-with-sort-of-1-24944-1395335905-10_big.jpg' },
    { username: 'name', url: 'https://consultation.spb.ru/upload/iblock/284/284acfcba3b530cda708e505c086cb57.jpg' },
    { username: 'name', url: 'http://greatlady.net/wp-content/uploads/2011/12/DhiMDE5Yj-300x205.jpg' },
    { username: 'name', url: 'http://www.networkdesigner.net/wp-content/uploads/2015/11/Tonsil-Stones-Remedy-Forever-Review-440x250.jpg' },
    { username: 'name', url: 'https://d28g7970w5bq8z.cloudfront.net/p/articles/ai-163427-aux-head-20150806_ludi_360.jpg' },
    { username: 'name', url: 'http://www.etoiledereve-animations.fr/wp-content/uploads/2014/01/anniversaire-detective.jpg' },
    { username: 'name', url: 'http://monateka.com/images/6061.jpg' },
    { username: 'name', url: 'https://im0-tub-ru.yandex.net/i?id=5779de66e079e0424ad01f06e652ac4f-sr&n=13' },
    { username: 'name', url: 'http://www.b17.ru/foto/uploaded/93e4dcd8b884e7473fc32b3594547e43.jpg' }
];

const friends = ({user}) => {

    const { friends } = user;

    const friendsCopyList = friends.length ? friends.length > 25 ? (
        friends.slice(0, 25).map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" }/>
        ))
    ):(
        friends.slice(0, 25).map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" }/>
        ))
    ): (
        <i className="fa fa-users empty-friends" aria-hidden="true"></i>
    );

    const friendsClasses = ['friends-wrapper'];

    if(friends.length === 0) {
        friendsClasses.push('empty-list-center');
    }

    return (
        <div className="friends">
            <h5 className="friends-header">Friends <span>({ friends.length !== 0 ? friends.length : '0' })</span></h5>
            <div className={ friendsClasses.join(" ") }>
                { friendsCopyList }
            </div>
        </div>
    );
};

export default friends;