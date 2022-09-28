import axios from "axios";
import React from "react";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/Dogs");

    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getAllTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_ALL_TEMPERAMENTS",
      payload: json.data,
    });
  };
}
export function postDogs(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/dogs", payload);
    return json;
  };
}

export function filterDogsByTemperaments(payload) {
  return {
    type: "FILTER_DOGS_BY_TEMPERAMENTS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function getDogsName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_DOGS_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
