import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ProfileField from './components/ProfileField/ProfileField';
import Slider from './components/Slider/Slider';
import styles from './UserData.module.scss';

import image from '../../assets/person-avatar-placeholder.png';
import { UserError } from '../../constants/errors';
import { Friends, MyPage } from '../../constants/pages';
import useFetch from '../../hooks/useFetch';
import { getBody, getId, getName, getPosts, getUserFriends } from '../../store/selectors/userSelector';
import { userSlice } from '../../store/slices/userSlice';
import { IIndexedStr } from '../../types/types';
import { getAge } from '../../utils/getAge';
import UserService from '../API/UserService';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageAdd from '../ImageAdd/ImageAdd';
import Loader from '../Loader/Loader';
import PostEditor from '../Posts/components/PostEditor';
import UserPostList from '../Posts/UserPostList/UserPostList';

const UserData: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const username = useSelector(getName);
  const userId = useSelector(getId);
  const userData = useSelector(getBody);

  const [age, setAge] = useState<string>(userData?.age!);
  const [city, setCity] = useState<string>(userData?.city!);
  const [about, setAbout] = useState<string>(userData?.about!);
  const [error, setError] = useState<boolean>(false);

  const postList = useSelector(getPosts);
  const friends = useSelector(getUserFriends);

  let [postData, isDataLoading, dataError] = useFetch(async () => {
    await UserService.editUser(userId, userBody);

    if (dataError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      dispatch(userSlice.actions.updateUser(JSON.parse(JSON.stringify(userBody))));
    }
  });

  const userBody: IIndexedStr = {
    about: userData!.about,
    age: userData!.age,
    city: userData!.city,
  };
  const userBodyKeys = Object.keys(userBody);

  const recordUserInfo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    if (index === 1) {
      setAge(event.target.value);
      return;
    }

    if (index === 2) {
      setCity(event.target.value);
      return;
    }
    const key = userBodyKeys[index];
    if (event.target instanceof HTMLTextAreaElement) {
      setAbout(event.target.value);
      userBody[key] = event.target?.value;
    }
  };

  useEffect(() => {
    if (dataError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [dataError]);

  const submitUserInfo = async () => {
    if (dataError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    try {
      userBody.age = age;
      userBody.city = city;
      userBody.about = about;
      await postData();

      setIsEdit((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.userData__wrapper}>
      <div className={styles.userData}>
        <div className={styles.userData__content}>
          <div className={styles.userData__headerWrapper}>
            <div className={styles.userData__imgWrapper}>
              <img className={styles.userData__img} src={image} alt='photouser' />
              {isEdit && <ImageAdd />}
            </div>
            <h1 className={styles.userData__name}>{username}</h1>
          </div>
          <div className={styles.userData__contentWrapper}>
            <ul className={styles.userDataField}>
              <li className={styles.userDataField__item}>
                <h3 className={styles.userData__header}>{`${MyPage.age}:`}</h3>{' '}
                <span>{`${isNaN(getAge(age)) ? '' : getAge(age)} ${
                  isNaN(getAge(age)) ? MyPage.noValue : MyPage.years
                }`}</span>
              </li>
              <ProfileField
                className={styles.userDataField__item}
                name={MyPage.birth}
                edit={isEdit}
                value={age}
                onChange={(event) => recordUserInfo(event, 1)}
                type='date'
                placeholder={MyPage.enterBirth}
              />
              <ProfileField
                className={styles.userDataField__item}
                name={MyPage.city}
                edit={isEdit}
                value={city}
                onChange={(event) => recordUserInfo(event, 2)}
                type='text'
                placeholder={MyPage.enterCity}
              />
              <h3 className={styles.userData__header}>{`${MyPage.about}:`}</h3>
              <li className={styles.userDataField__item}>
                {isEdit ? (
                  <textarea
                    className={`${styles.userDataField__item} ${styles.userDataField__textArea}`}
                    value={about}
                    onChange={(event) => recordUserInfo(event, 0)}
                    cols={50}
                    rows={10}
                  ></textarea>
                ) : (
                  <p className={`${styles.userDataField__item} ${styles.userDataField__paragraph}`}>
                    {about ? about : MyPage.noValue}
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.userData__footer}>
          <Button
            text={isEdit ? MyPage.save : MyPage.edit}
            onClick={isEdit ? submitUserInfo : () => setIsEdit((prev) => !prev)}
          />
          <div className={styles.userData__loaderWrapper}>{isDataLoading && <Loader />}</div>
        </div>
        <ErrorMessage
          additionalClass={error ? styles.userData__error_visible : styles.userData__error_hidden}
          text={UserError.userData}
        />
      </div>
      <div className={styles.myPage__posts}>
        {friends.length > 0 ? (
          <Slider friends={friends} />
        ) : (
          <h1 className={styles.userData__friends}>{Friends.noFriends}</h1>
        )}
        <PostEditor />
        <UserPostList postList={postList!} />
      </div>
    </div>
  );
};

export default UserData;
