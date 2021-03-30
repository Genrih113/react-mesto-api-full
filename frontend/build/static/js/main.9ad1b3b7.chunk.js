(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{29:function(e,t,n){},30:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(1),i=n.n(o),s=n(19),c=n.n(s),r=(n(29),n(22)),u=n(2),l=n(3),p=(n(30),n(8)),d=n.p+"static/media/mesto_logo.a307e1c4.svg";var m=function(e){return Object(a.jsxs)("header",{className:"header",children:[Object(a.jsx)("div",{className:"logo header__logo",children:Object(a.jsx)("img",{className:"logo__img",src:d,alt:"\u041f\u0440\u043e\u0435\u043a\u0442 \u041c\u0435\u0441\u0442\u043e"})}),Object(a.jsxs)("nav",{className:"header__navigation-zone",children:[e.loggedIn&&Object(a.jsx)("span",{className:"header__user-email",children:e.userEmail}),"\u0412\u043e\u0439\u0442\u0438"===e.headerLink&&Object(a.jsx)(p.b,{className:"header__handler",to:"/signin",children:"\u0412\u043e\u0439\u0442\u0438"}),"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"===e.headerLink&&Object(a.jsx)(p.b,{className:"header__handler",to:"/signup",children:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"}),"\u0412\u044b\u0439\u0442\u0438"===e.headerLink&&Object(a.jsx)(p.b,{className:"header__handler",to:"/signin",onClick:function(){return e.logOut()},children:"\u0412\u044b\u0439\u0442\u0438"})]})]})},h=i.a.createContext();var j=function(e){var t=i.a.useContext(h),n=e.card.owner===t._id,o=e.card.likes.some((function(e){return e===t._id}));return Object(a.jsxs)("li",{className:"place",children:[Object(a.jsx)("div",{className:"place__img-container",children:Object(a.jsx)("img",{className:"place__img",src:e.card.link,alt:e.card.name,onClick:function(){return e.onCardClick(e.card)}})}),Object(a.jsxs)("div",{className:"place__description",children:[Object(a.jsx)("h2",{className:"place__title",children:e.card.name}),Object(a.jsxs)("div",{className:"place__like-container",children:[Object(a.jsx)("button",{className:"place__like-button ".concat(o&&"place__like-button_liked"),type:"button",onClick:function(){return e.onCardLike(e.card)}}),Object(a.jsx)("p",{className:"place__like-counter",children:e.card.likes.length})]})]}),Object(a.jsx)("button",{className:"place__delete-button ".concat(!n&&"place__delete-button_invisible"),type:"button",onClick:function(){return e.onCardDelete(e.card)}})]})};var b=function(e){var t=i.a.useContext(h);return i.a.useEffect((function(){e.chooseHeaderLink("\u0412\u044b\u0439\u0442\u0438")}),[]),Object(a.jsxs)("main",{className:"main",children:[Object(a.jsxs)("section",{className:"profile",children:[Object(a.jsxs)("div",{className:"person",children:[Object(a.jsxs)("div",{className:"person__avatar-container",children:[Object(a.jsx)("div",{className:"person__avatar-img-container",children:Object(a.jsx)("img",{className:"person__avatar",src:t.avatar,alt:"\u0410\u0432\u0430\u0442\u0430\u0440"})}),Object(a.jsx)("div",{onClick:e.onEditAvatar,className:"person__avatar-button"})]}),Object(a.jsxs)("div",{className:"person__edit",children:[Object(a.jsxs)("div",{className:"person__description",children:[Object(a.jsx)("h1",{className:"person__name",children:t.name}),Object(a.jsx)("p",{className:"person__passion",children:t.about})]}),Object(a.jsx)("button",{onClick:e.onEditProfile,className:"person__edit-button",type:"button","aria-label":"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"})]})]}),Object(a.jsx)("button",{onClick:e.onAddPlace,className:"add-button",type:"button","aria-label":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})]}),Object(a.jsx)("section",{children:Object(a.jsx)("ul",{className:"places",children:e.cards.map((function(t,n){return Object(a.jsx)(j,{card:t,onCardClick:e.onCardClick,onCardLike:e.onCardLike,onCardDelete:e.onCardDelete},t._id)}))})})]})};var f=function(){return Object(a.jsx)("footer",{className:"footer",children:Object(a.jsx)("p",{className:"footer__copyright",children:"\xa9 2020 Mesto Russia"})})};var _=function(e){return Object(a.jsx)("div",{className:"popup popup_place-view ".concat(e.isOpen&&"popup_opened"),onClick:function(t){t.target===t.currentTarget&&e.onClose()},children:Object(a.jsxs)("figure",{className:"popup__figure",children:[Object(a.jsx)("img",{className:"popup__place-image",src:e.card.link,alt:e.card.name}),Object(a.jsx)("figcaption",{className:"popup__place-caption",children:e.card.name}),Object(a.jsx)("button",{className:"popup__close popup__close_place-view",type:"button","aria-label":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",onClick:e.onClose})]})})},g=n(10),O=n(11),v=new(function(){function e(t){var n=t.baseUrl,a=t.token;Object(g.a)(this,e),this._baseUrl=n,this._token=a}return Object(O.a)(e,[{key:"getUserInfo",value:function(){return fetch(this._baseUrl+"/users/me",{headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"getInitialCards",value:function(){return fetch(this._baseUrl+"/cards",{headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"editUserInfo",value:function(e){return fetch(this._baseUrl+"/users/me",{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"addNewCard",value:function(e){return fetch(this._baseUrl+"/cards",{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e,{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"likeToggleCard",value:function(e,t){return e?fetch(this._baseUrl+"/cards/"+t+"/likes/",{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))})):fetch(this._baseUrl+"/cards/"+t+"/likes/",{method:"PUT",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"changeAvatar",value:function(e){return fetch(this._baseUrl+"/users/me/avatar",{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}}]),e}())({baseUrl:"http://api.genrih113-mesto.nomoredomains.club",token:"Bearer ".concat(localStorage.getItem("token"))}),x=new(function(){function e(t){var n=t.formSelector,a=t.inputSelector,o=t.submitButtonSelector,i=t.inactiveButtonClass,s=t.inputErrorClass,c=t.errorSelector;Object(g.a)(this,e),this._formSelector=n,this._inputSelector=a,this._submitButtonSelector=o,this._inactiveButtonClass=i,this._inputErrorClass=s,this._errorSelector=c}return Object(O.a)(e,[{key:"selectForm",value:function(e){this._validatedFormElement=document.querySelector(e),this._submitButton=this._validatedFormElement.querySelector(this._submitButtonSelector),this._inputElements=Array.from(this._validatedFormElement.querySelectorAll(this._inputSelector))}},{key:"_showInputError",value:function(e){e.classList.add(this._inputErrorClass),this._validatedFormElement.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage}},{key:"_hideInputError",value:function(e){e.classList.remove(this._inputErrorClass),this._validatedFormElement.querySelector("#".concat(e.id,"-error")).textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputElements.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.disabled=!0,this._submitButton.classList.add(this._inactiveButtonClass)):(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._inactiveButtonClass))}},{key:"clearPopupFromErrors",value:function(){var e=this;0!==this._inputElements.length&&(this._inputElements.forEach((function(t){e._hideInputError(t)})),this._submitButton.disabled=!0,this._submitButton.classList.add(this._inactiveButtonClass))}},{key:"validateForm",value:function(){var e=this;0!==this._inputElements.length&&(this._validatedFormElement.addEventListener("submit",(function(e){e.preventDefault()})),this._toggleButtonState(),this._inputElements.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))})))}}]),e}())({formSelector:".popup__container",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_state_error",errorSelector:".error"});var k=function(e){return i.a.useEffect((function(){e.isOpen&&(x.selectForm(".popup__container_".concat(e.name)),x.validateForm(),x.clearPopupFromErrors())}),[e.isOpen,e.name]),Object(a.jsx)("div",{className:"popup ".concat(e.isOpen&&"popup_opened"," popup_").concat(e.name),onClick:function(t){t.target===t.currentTarget&&e.onClose()},children:Object(a.jsxs)("form",{onSubmit:function(t){return e.onSubmit(t)},className:"popup__container popup__container_".concat(e.name),name:"".concat(e.name,"PopupForm"),noValidate:!0,children:[Object(a.jsx)("h2",{className:"popup__title",children:e.title}),Object(a.jsxs)("fieldset",{className:"popup__content",children:[e.children,Object(a.jsx)("button",{className:"popup__submit",type:"submit",children:e.buttonText})]}),Object(a.jsx)("button",{onClick:function(){e.onClose()},className:"popup__close popup__close_".concat(e.name),type:"button","aria-label":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})]})})};var C=function(e){var t=i.a.useState(""),n=Object(u.a)(t,2),o=n[0],s=n[1],c=i.a.useState(""),r=Object(u.a)(c,2),l=r[0],p=r[1],d=i.a.useContext(h);return i.a.useEffect((function(){s(d.name),p(d.about)}),[d,e.isOpen]),Object(a.jsxs)(k,{name:"profile",title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",buttonText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(t){t.preventDefault(),e.onUpdateUser({name:o,about:l})},children:[Object(a.jsx)("input",{onChange:function(e){s(e.target.value)},value:o,id:"personName",className:"popup__input popup__name_profile",name:"popupInputName",type:"text",minLength:"2",maxLength:"40",required:!0,placeholder:"\u0418\u043c\u044f"}),Object(a.jsx)("span",{id:"personName-error",className:"error"}),Object(a.jsx)("input",{onChange:function(e){p(e.target.value)},value:l,id:"personPassion",className:"popup__input popup__passion_profile",name:"popupInputPassion",type:"text",minLength:"2",maxLength:"200",required:!0,placeholder:"\u041e \u0441\u0435\u0431\u0435"}),Object(a.jsx)("span",{id:"personPassion-error",className:"error"})]})};var S=function(e){var t=i.a.useRef();return e.isOpen&&(t.current.value=""),Object(a.jsxs)(k,{name:"avatar",title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",buttonText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(n){n.preventDefault(),e.onUpdateAvatar(t.current.value),t.current.value=""},children:[Object(a.jsx)("input",{ref:t,id:"avatarLink",className:"popup__input popup__link_avatar",name:"popupInputAvatarLink",type:"url",required:!0,placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0430\u0432\u0430\u0442\u0430\u0440"}),Object(a.jsx)("span",{id:"avatarLink-error",className:"error"})]})};var N=function(e){var t=i.a.useState(""),n=Object(u.a)(t,2),o=n[0],s=n[1],c=i.a.useState(""),r=Object(u.a)(c,2),l=r[0],p=r[1];return i.a.useEffect((function(){e.isOpen&&(s(""),p(""))}),[e.isOpen]),Object(a.jsxs)(k,{name:"place",title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",buttonText:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(t){t.preventDefault(),e.onAddPlace({name:o,link:l})},children:[Object(a.jsx)("input",{onChange:function(e){s(e.target.value)},id:"placeName",className:"popup__input popup__name_place",name:"popupInputPlace",type:"text",minLength:"2",maxLength:"30",required:!0,placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",value:o}),Object(a.jsx)("span",{id:"placeName-error",className:"error"}),Object(a.jsx)("input",{onChange:function(e){p(e.target.value)},id:"placeLink",className:"popup__input popup__link_place",name:"popupInputLink",type:"url",required:!0,placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",value:l}),Object(a.jsx)("span",{id:"placeLink-error",className:"error"})]})};var y=function(e){return Object(a.jsx)(k,{name:"confirm",title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",buttonText:"\u0414\u0430",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(t){t.preventDefault(),e.onConfirm()}})};n(39);var E=function(e){return Object(a.jsx)("div",{className:"sign-form-container",children:Object(a.jsxs)("form",{onSubmit:e.handleSubmit,className:"sign-form sign-form-container__item",name:"".concat(e.formName),children:[Object(a.jsx)("h2",{className:"sign-form__title",children:e.formTitle}),Object(a.jsx)("input",{onChange:e.handleChangeEmail,value:e.email,id:"email",className:"sign-form__input",name:"Email",type:"email",minLength:"2",maxLength:"40",required:!0,placeholder:"email"}),Object(a.jsx)("input",{onChange:e.handleChangePassword,value:e.password,id:"password",className:"sign-form__input",name:"password",type:"password",minLength:"2",maxLength:"40",required:!0,placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c"}),Object(a.jsx)("button",{className:"sign-form__submit",type:"submit",children:"".concat(e.buttonText)}),e.isSignUp&&Object(a.jsxs)("div",{className:"sign-form__login-prompt",children:[Object(a.jsx)("span",{children:"\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b? "}),Object(a.jsx)(p.b,{className:"sign-form__link",to:"/signin",children:"\u0412\u043e\u0439\u0442\u0438"})]})]})})};var L=function(e){var t=i.a.useState(""),n=Object(u.a)(t,2),o=n[0],s=n[1],c=i.a.useState(""),r=Object(u.a)(c,2),l=r[0],p=r[1];return i.a.useEffect((function(){e.chooseHeaderLink("\u0412\u043e\u0439\u0442\u0438")}),[]),Object(a.jsx)(E,{formName:"registrationForm",formTitle:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f",isSignUp:!0,buttonText:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f",handleChangeEmail:function(e){s(e.target.value)},handleChangePassword:function(e){p(e.target.value)},handleSubmit:function(t){t.preventDefault(),e.signUp(l,o)},email:o,password:l})};var T=function(e){var t=i.a.useState(""),n=Object(u.a)(t,2),o=n[0],s=n[1],c=i.a.useState(""),r=Object(u.a)(c,2),l=r[0],p=r[1];return i.a.useEffect((function(){e.chooseHeaderLink("\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f")}),[]),Object(a.jsx)(E,{formName:"loginForm",formTitle:"\u0412\u0445\u043e\u0434",isSignUp:!1,buttonText:"\u0412\u043e\u0439\u0442\u0438",handleChangeEmail:function(e){s(e.target.value)},handleChangePassword:function(e){p(e.target.value)},handleSubmit:function(t){t.preventDefault(),e.signIn(l,o)},email:o,password:l})},P=n(23),I=n(21);var U=function(e){var t=e.component,n=Object(I.a)(e,["component"]);return Object(a.jsx)(l.b,{children:function(){return n.loggedIn?Object(a.jsx)(t,Object(P.a)({},n)):Object(a.jsx)(l.a,{to:"/signin"})}})},B=new(function(){function e(t){var n=t.baseUrl;Object(g.a)(this,e),this._baseUrl=n}return Object(O.a)(e,[{key:"signup",value:function(e,t){return fetch(this._baseUrl+"/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e,email:t})}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"signin",value:function(e,t){return fetch(this._baseUrl+"/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e,email:t})}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}},{key:"checkToken",value:function(e){return fetch(this._baseUrl+"/users/me",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}).then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}))}}]),e}())({baseUrl:"http://api.genrih113-mesto.nomoredomains.club"}),w=(n(40),n.p+"static/media/sign_success.1b6082f8.svg"),F=n.p+"static/media/sign_error.df8eddf6.svg";var A=function(e){var t=Object(l.g)();return Object(a.jsx)("div",{className:"info-tooltip",children:Object(a.jsxs)("div",{className:"info-tooltip__item",children:[e.isSignSuccessful&&Object(a.jsx)("img",{className:"info-tooltip__image",src:w,alt:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u043f\u0440\u043e\u0439\u0434\u0435\u043d\u0430"}),e.isSignFailed&&Object(a.jsx)("img",{className:"info-tooltip__image",src:F,alt:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u043d\u0435 \u043f\u0440\u043e\u0439\u0434\u0435\u043d\u0430"}),e.isSignSuccessful&&Object(a.jsx)("p",{className:"info-tooltip__message",children:"\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c!"}),e.isSignFailed&&Object(a.jsx)("p",{className:"info-tooltip__message",children:"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."}),Object(a.jsx)("button",{onClick:function(){e.isSignSuccessful&&t.push("/signin"),e.resetSignStatus()},className:"popup__close",type:"button","aria-label":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})]})})};var D=function(){var e=i.a.useState(!1),t=Object(u.a)(e,2),n=t[0],s=t[1],c=i.a.useState(!1),p=Object(u.a)(c,2),d=p[0],j=p[1],g=i.a.useState(!1),O=Object(u.a)(g,2),x=O[0],k=O[1],E=i.a.useState(!1),P=Object(u.a)(E,2),I=P[0],w=P[1],F=i.a.useState(!1),D=Object(u.a)(F,2),q=D[0],z=D[1];function H(){k(!1),s(!1),j(!1),w(!1),z(!1),W({})}var J=i.a.useState({about:"",avatar:"",cohort:"",name:"",_id:"75afb32823f9c1dc44155bd8"}),M=Object(u.a)(J,2),V=M[0],R=M[1];i.a.useEffect((function(){v.getUserInfo().then((function(e){R(e)})).catch((function(e){return console.log(e)}))}),[]);var G=i.a.useState({}),K=Object(u.a)(G,2),Q=K[0],W=K[1],X=i.a.useState([]),Y=Object(u.a)(X,2),Z=Y[0],$=Y[1];i.a.useEffect((function(){v.getInitialCards().then((function(e){$(e)})).catch((function(e){return console.log(e)}))}),[]);var ee=Object(o.useState)(""),te=Object(u.a)(ee,2),ne=te[0],ae=te[1];function oe(e){ae(e)}var ie=i.a.useState(!1),se=Object(u.a)(ie,2),ce=se[0],re=se[1];function ue(){re(!0)}var le=i.a.useState(""),pe=Object(u.a)(le,2),de=pe[0],me=pe[1];function he(e){me(e)}var je=Object(l.g)();i.a.useEffect((function(){Boolean(localStorage.getItem("token"))&&B.checkToken(localStorage.getItem("token")).then((function(e){e.email&&(he(e.email),ue(),je.push("/"))})).catch((function(e){return console.log(e)}))}),[je]);var be=i.a.useState(!1),fe=Object(u.a)(be,2),_e=fe[0],ge=fe[1],Oe=i.a.useState(!1),ve=Object(u.a)(Oe,2),xe=ve[0],ke=ve[1],Ce=i.a.useState(!1),Se=Object(u.a)(Ce,2),Ne=Se[0],ye=Se[1];function Ee(){ke(!0)}function Le(){ye(!0)}return Object(a.jsx)(h.Provider,{value:V,children:Object(a.jsx)("div",{className:"body",children:Object(a.jsxs)("div",{className:"page body__page",children:[Object(a.jsx)(m,{headerLink:ne,userEmail:de,loggedIn:ce,logOut:function(){re(!1),localStorage.removeItem("token")}}),Object(a.jsxs)(l.d,{children:[Object(a.jsx)(l.b,{path:"/signup",children:Object(a.jsx)(L,{chooseHeaderLink:oe,signUp:function(e,t){B.signup(e,t).then((function(e){ge(!0),Le()})).catch((function(e){Ee(),Le()}))}})}),Object(a.jsx)(l.b,{path:"/signin",children:Object(a.jsx)(T,{chooseHeaderLink:oe,signIn:function(e,t){B.signin(e,t).then((function(e){localStorage.setItem("token",e.token),he(t),ue(),je.push("/")})).catch((function(e){Ee(),Le()}))}})}),Object(a.jsx)(U,{path:"/",component:b,onEditProfile:function(){s(!0)},onAddPlace:function(){j(!0)},onEditAvatar:function(){k(!0)},onCardClick:function(e){W(e),w(!0)},cards:Z,onCardLike:function(e){var t=e.likes.some((function(e){return e===V._id}));v.likeToggleCard(t,e._id).then((function(t){var n=Z.map((function(n){return n._id===e._id?t:n}));$(n)})).catch((function(e){return console.log(e)}))},onCardDelete:function(e){W(e),z(!0)},loggedIn:ce,chooseHeaderLink:oe})]}),Object(a.jsx)(C,{isOpen:n,onClose:H,onUpdateUser:function(e){v.editUserInfo(e).then((function(e){R(e),H()})).catch((function(e){return console.log(e)})).finally(H())}}),Object(a.jsx)(N,{isOpen:d,onClose:H,onAddPlace:function(e){v.addNewCard(e).then((function(e){$([e].concat(Object(r.a)(Z)))})).catch((function(e){return console.log(e)})).finally(H())}}),Object(a.jsx)(S,{isOpen:x,onClose:H,onUpdateAvatar:function(e){v.changeAvatar(e).then((function(e){R(e)})).catch((function(e){return console.log(e)})).finally(H())}}),Object(a.jsx)(_,{isOpen:I,card:Q,onClose:H}),Object(a.jsx)(y,{isOpen:q,onClose:H,onConfirm:function(){return e=Q,void v.deleteCard(e._id).then((function(t){var n=Z.filter((function(t){return t._id!==e._id}));$(n)})).catch((function(e){return console.log(e)})).finally(H());var e}}),Ne&&Object(a.jsx)(A,{isSignFailed:xe,isSignSuccessful:_e,resetSignStatus:function(){ge(!1),ke(!1),ye(!1)}}),Object(a.jsx)(f,{})]})})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),o(e),i(e),s(e)}))};c.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(p.a,{children:Object(a.jsx)(D,{})})}),document.getElementById("root")),q()}},[[41,1,2]]]);
//# sourceMappingURL=main.9ad1b3b7.chunk.js.map