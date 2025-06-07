"use client"
import React, { useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin, } from '@react-oauth/google';
import { config } from '@/global/config';
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie } from "cookies-next";
import { OauthType, User } from '@/global/dtos/user';


const CustomGoogleOneTapLogin = () => {
    const createdUser: User = {}
    const userCookie = getCookie('user')
    const user: User = userCookie ? JSON.parse(userCookie as any) : ''
    const userEmail = user?.email
    // const toUpdate = user ? !user?.email ? true : false : false


    // if (!userEmail)
    useGoogleOneTapLogin({

        auto_select: true,
        onSuccess: response => {
            const { credential } = response;

            try {
                // Decode the JWT token
                const userInfo = jwtDecode(credential as string) as any
                console.log(userInfo);
                createdUser.oauthId = userInfo.sub
                createdUser.oauthType = OauthType.google
                createdUser.email = userInfo?.email
                createdUser.name = userInfo.name
                createdUser.image = userInfo.picture
                fetch(`${config.hostname}/users`, {
                    cache: 'no-cache',
                    body: JSON.stringify(createdUser),
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    method: "PUT",
                }).then((res) => {
                    return res.json();

                }).then((data) => {
                    setCookie("user", data.data)

                }).catch((err) => {
                    console.log(err);

                })

            } catch (error) {
                console.error('Error decoding token or sending to server:', error);
            }


        },
        onError() {
            console.log("error_______oauth");

        },
    });

    return null;  // No UI elements needed for One Tap
};

const CustomGoogleLogin = () => {
    return (
        <CustomGoogleOneTapLogin />
    );
};

export default CustomGoogleLogin;
