import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import styles from './Slider.module.scss';

import { UserError } from '../../../../constants/errors';
import { Friends, MyPage } from '../../../../constants/pages';
import useFetch from '../../../../hooks/useFetch';
// import { getId } from '../../../../store/selectors/userSelector';
import { IFriendItem } from '../../../../types/types';
import UserService from '../../../API/UserService';
import FriendCard from '../../../Friends/FriendItem/FriendCard/FriendCard';
import Loader from '../../../Loader/Loader';

interface ISlider {
  friends: string[];
}

const Slider: React.FC<ISlider> = (friendList: ISlider) => {
  const [friends, setFriends] = useState<IFriendItem[]>([]);
  const [load, setLoad] = useState<boolean>(true);

  const [fetchFriends, isFriendsLoading, isFriendsError] = useFetch(async () => {
    const friends = friendList.friends.map(async (friend: string) => {
      return (await UserService.getUser(friend)).data;
    });
    Promise.all(friends).then((res) => setFriends(JSON.parse(JSON.stringify(res))));
  });

  useEffect(() => {
    fetchFriends();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendList]);

  setTimeout(() => {
    setLoad(false);
  }, 250);

  if (isFriendsLoading) {
    return (
      <div className={styles.caruselWrapper}>
        <Loader />
      </div>
    );
  }

  if (isFriendsError) {
    return (
      <div className={styles.caruselWrapper}>
        <h1 className={styles.caruselWrapper}>{`${UserError.postListgetErr}${UserError.postListTryLater}`}</h1>
      </div>
    );
  }

  return (
    <div className={styles.friends}>
      <h1 className={styles.friends__header}>{Friends.friends}</h1>
      <div className={styles.caruselWrapper}>
        {load ? (
          <Loader />
        ) : (
          <Swiper
            className={styles.carusel}
            modules={[Navigation, Autoplay]}
            effect='fade'
            spaceBetween={10}
            slidesPerView={2}
            navigation={{
              nextEl: '.button-next-slide',
              prevEl: '.button-prev-slide',
            }}
            autoplay
            loop={friendList.friends.length > 3 ? true : false}
          >
            {friends.map((friend) => {
              return (
                <SwiperSlide key={friend._id}>
                  <FriendCard
                    id={friend._id}
                    additionalClass={styles.carusel__card}
                    name={friend.name}
                    city={friend.body.city !== undefined ? friend.body.city : MyPage.noValue}
                    birth={friend.body.age !== undefined ? friend.body.age : MyPage.noValue}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className={`button-prev-slide ${styles.prev_slide}`}></div>
        <div className={`button-next-slide ${styles.next_slide}`}></div>
      </div>
    </div>
  );
};

export default Slider;
