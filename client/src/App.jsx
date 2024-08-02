
import './App.css'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import DoctorApplicationForm from './pages/DoctorApplicationForm.jsx';
import Notifications from './pages/Notifications.jsx';
import Users from './pages/visibletoadmin/Users.jsx';
import Doctors from './pages/visibletoadmin/Doctors.jsx';
import Profile from './pages/visibletodoctor/Profile.jsx';
import Booking from './pages/Booking.jsx';
import UserAppointments from './pages/UserAppointments';
import DocAppointments from './pages/visibletodoctor/DocAppointments.jsx';
import UserAndAdminProfile from './pages/UserAndAdminProfile.jsx';
import BMICalculator from './pages/BMI.jsx';
import Articles from './pages/Articles.jsx';


function App() {

    const { loading } = useSelector(state => state.alerts);

    return (
        <>
            <BrowserRouter>
                {
                    loading ? (<Spinner />)
                        : (
                            <Routes>
                                <Route path='/'
                                    element={
                                        <ProtectedRoute>
                                            <HomePage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path='/register' element={
                                    <PublicRoute>
                                        <Register />
                                    </PublicRoute>
                                } />
                                <Route path='/login' element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                } />
                                <Route path='/apply-doctor' element={
                                    <ProtectedRoute>
                                        <DoctorApplicationForm />
                                    </ProtectedRoute>
                                } />
                                <Route path='/admin/users' element={
                                    <ProtectedRoute>
                                        <Users />
                                    </ProtectedRoute>
                                } />
                                <Route path='/admin/doctors' element={
                                    <ProtectedRoute>
                                        <Doctors />
                                    </ProtectedRoute>
                                } />
                                <Route path='/profile' element={
                                    <ProtectedRoute>
                                        <UserAndAdminProfile />
                                    </ProtectedRoute>
                                } />
                                <Route path='/bmi' element={
                                    <ProtectedRoute>
                                        <BMICalculator />
                                    </ProtectedRoute>
                                } />
                                <Route path='/health-articles' element={
                                    <ProtectedRoute>
                                        <Articles />
                                    </ProtectedRoute>
                                } />
                                <Route path='/doctor/profile/:id' element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />
                                <Route path='/doctor/book-appointment/:doctorId' element={
                                    <ProtectedRoute>
                                        <Booking />
                                    </ProtectedRoute>
                                } />
                                <Route path='/appointments' element={
                                    <ProtectedRoute>
                                        <UserAppointments />
                                    </ProtectedRoute>
                                } />
                                <Route path='/doctor/appointments' element={
                                    <ProtectedRoute>
                                        <DocAppointments />
                                    </ProtectedRoute>
                                } />
                                <Route path='/getAllNotifications' element={
                                    <ProtectedRoute>
                                        <Notifications />
                                    </ProtectedRoute>
                                } />
                            </Routes>)}
            </BrowserRouter>
        </>
    )
}

export default App
