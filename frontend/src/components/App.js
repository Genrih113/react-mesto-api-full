import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import signApi from '../utils/signApi';
import InfoTooltip from './InfoTooltip.js';


function App() {
  // стейты и хендлы состояний попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handlePlaceImageClick() {
    setIsImagePopupOpen(true);
  }

  function handleOpenConfirmPopupClick() {
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }


  //стейт, хендлы и эффект контекста-юзера
  const [currentUser, setCurrentUser] = React.useState({
    about: "",
    avatar: "",
    email: "",
    name: "",
    _id: "",
  });

  function resetCurrentUser() {
    setCurrentUser({
      about: "",
      avatar: "",
      email: "",
      name: "",
      _id: "",
    });
  };

  function handleUpdateUser(obj) {
    api.editUserInfo(localStorage.getItem('token'), obj)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(closeAllPopups())
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(localStorage.getItem('token'), url)
    .then((result) => {
      setCurrentUser(result);
    })
    .catch(err => console.log(err))
    .finally(closeAllPopups())
  }




  //стейт выбранной карточки и хендлы открытия попапов просмотра фотографии и подтверждения удаления
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
    handlePlaceImageClick();
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    handleOpenConfirmPopupClick();
  }


  //стейт, эффект и хендлы работы с массивом карточек мест
  const [cards, setCards] = React.useState([]);



  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeToggleCard(localStorage.getItem('token'), isLiked, card._id)
    .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch(err => console.log(err))
  }

  //хендл удаления карточки запускается из попапа подтверждения
  function handleCardDelete(card) {
    api.deleteCard(localStorage.getItem('token'), card._id)
    .then((result) => {
      const newCards = cards.filter((c) => {return (c._id !== card._id)});
      setCards(newCards);
    })
    .catch(err => console.log(err))
    .finally(closeAllPopups())
  }

  function handleAddPlaceSubmit(newPlaceObj) {
    api.addNewCard(localStorage.getItem('token'), newPlaceObj)
    .then((result) => {
      setCards([result, ...cards]);
    })
    .catch(err => console.log(err))
    .finally(closeAllPopups())
  }



  // к 14му спринту


  const [headerLink, setHeaderLink] = useState('');
  function chooseHeaderLink(string) {
    setHeaderLink(string);
  }

  const [loggedIn, setLoggedIn] = React.useState(false);
  function logIn() {
    setLoggedIn(true);
  }
  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    resetCurrentUser();
  }

  // const [userEmail, setUserEmail] = React.useState('');
  // function memorizeUserEmail(email) {
  //   setUserEmail(email);
  // }

  const history = useHistory();

  React.useEffect(() => {
    if (Boolean(localStorage.getItem('token'))) {
      signApi.checkToken(localStorage.getItem('token'))
      .then((result) => {
        if (result.email) {
          //memorizeUserEmail(result.email);
          setCurrentUser(result);
          logIn();
          history.push('/');
        }
      })
      .catch(err => console.log(err))
    }
  }, [history]);

  function signIn(password, email) {
    signApi.signin(password, email)
    .then((res) => {
      // localStorage.setItem('token', (res.userWithToken.token));//JSON.stringify(res.token));
      localStorage.setItem('token', (res.token));
      // setCurrentUser(res.userWithToken.user);
      // memorizeUserEmail(email);
      logIn();
      history.push('/');
    })
    .catch((err) => {
      switchIsSignFailedOnTrue();
      switchIsTriedToSignOnTrue();
    })
  }


  const [isSignSuccessful, setIsSignSuccessful] = React.useState(false);
  const [isSignFailed, setIsSignFailed] = React.useState(false);
  const [isTriedToSign, setIsTriedToSign] = React.useState(false);

  function switchIsSignSuccessfulOnTrue() {
    setIsSignSuccessful(true);
  }

  function switchIsSignFailedOnTrue() {
    setIsSignFailed(true);
  }

  function switchIsTriedToSignOnTrue() {
    setIsTriedToSign(true);
  }

  function resetSignStatus() {
    setIsSignSuccessful(false);
    setIsSignFailed(false);
    setIsTriedToSign(false);
  }

  function signUp(password, email) {
    signApi.signup(password, email)
      .then((res) => {
        switchIsSignSuccessfulOnTrue();
        switchIsTriedToSignOnTrue();
      })
      .catch((err) => {
        switchIsSignFailedOnTrue();
        switchIsTriedToSignOnTrue();
      })
  }



  React.useEffect(() => {
    if (!loggedIn) {
      return
    }
    api.getUserInfo(localStorage.getItem('token'))
    .then((result) => {
      setCurrentUser(result);
    })
    .catch(err => console.log(err))
  }, [loggedIn]);


  React.useEffect(() => {
    if (!loggedIn) {
      return
    }
    api.getInitialCards(localStorage.getItem('token'))
    .then((result) => {
      setCards(result);
    })
    .catch(err => console.log(err))
  }, [loggedIn]);


  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="body">
        <div className="page body__page">

          <Header
            headerLink = {headerLink}
            userEmail = {currentUser.email}
            loggedIn = {loggedIn}
            logOut = {logOut}
          />

          <Switch>

            <Route path="/signup" >
              <Register
                chooseHeaderLink = {chooseHeaderLink}
                signUp = {signUp}
              />
            </Route>

            <Route path="/signin" >
              <Login
                chooseHeaderLink = {chooseHeaderLink}
                signIn = {signIn}
              />
            </Route>

            <ProtectedRoute path="/"
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                //onCardDelete={handleCardDelete}
                onCardDelete={handleCardDeleteClick}

                loggedIn = {loggedIn}
                chooseHeaderLink = {chooseHeaderLink}
            />

          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={() => handleCardDelete(selectedCard)}
          />

          {
            isTriedToSign &&
            <InfoTooltip
              isSignFailed = {isSignFailed}
              isSignSuccessful = {isSignSuccessful}
              resetSignStatus = {resetSignStatus}
            />
          }


          <Footer />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
