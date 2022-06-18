import { css } from "@emotion/react";

export const API_URL = process.env.REACT_APP_API_URL

export const Local = JSON.parse(localStorage.getItem("User"));


export const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;