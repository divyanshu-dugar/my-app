import { getToken } from "@/lib/authenticate";

const addToFavourites = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

const removeFromFavourites = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

const getFavourites = async() => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: 'GET',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

const addToHistory = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

const removeFromHistory = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

const getHistory = async() => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: 'GET',
    headers: { Authorization: `JWT ${getToken()}` }
  });    

  if (res.status === 200){
    return res.json();
  }else{
    return [];
  }
} 

module.exports = {
    addToFavourites,
    removeFromFavourites,
    getFavourites,
    addToHistory,
    removeFromHistory,
    getHistory
}