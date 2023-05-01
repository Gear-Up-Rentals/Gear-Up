import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if(!currentUser.email) {
    toast("Please login first");
    return <Navigate to = "/" />
  }

  return children;
}
