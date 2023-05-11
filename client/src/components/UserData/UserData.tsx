import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './UserData.module.scss';

import image from '../../assets/person-avatar-placeholder.png';
import { MyPage } from '../../constants/pages';
import { getBody, getId, getName } from '../../store/selectors/userSelector';
import { userSlice } from '../../store/slices/userSlice';
import { IIndexedStr } from '../../types/types';
import UserService from '../API/UserService';
import Button from '../Button/Button';
import ImageAdd from '../ImageAdd/ImageAdd';
import PostEditor from '../Posts/components/PostEditor';
import UserPostList from '../Posts/UserPostList/UserPostList';

const UserData: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const headers = [MyPage.about, MyPage.education, MyPage.hobby];
  const dispatch = useDispatch();

  const username = useSelector(getName);
  const userId = useSelector(getId);
  const userData = useSelector(getBody);

  const userBody: IIndexedStr = {
    about: userData!.about,
    education: userData!.education,
    hobby: userData!.hobby,
  };
  const userBodyKeys = Object.keys(userBody);

  const recordUserInfo = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const key = userBodyKeys[index];
    if (event.target instanceof HTMLTextAreaElement) {
      userBody[key] = event.target?.value;
    }
  };

  const submitUserInfo = async () => {
    try {
      await UserService.editUser(userId, userBody);
      dispatch(userSlice.actions.updateUser(JSON.parse(JSON.stringify(userBody))));
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
            {headers.map((header, i) => (
              <div key={i} className={styles.userData__field}>
                <h3 className={styles.userData__header}>{header}</h3>
                {isEdit ? (
                  <textarea
                    defaultValue={JSON.parse(JSON.stringify(userData))[userBodyKeys[i]]}
                    onChange={(event) => recordUserInfo(event, i)}
                    cols={50}
                    rows={8}
                  ></textarea>
                ) : (
                  <p>{JSON.parse(JSON.stringify(userData))[userBodyKeys[i]]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <Button
          text={isEdit ? MyPage.save : MyPage.edit}
          onClick={isEdit ? submitUserInfo : () => setIsEdit((prev) => !prev)}
        />
      </div>
      <div className={styles.myPage__posts}>
        <PostEditor />
        <UserPostList />
      </div>
    </div>
  );
};

export default UserData;
