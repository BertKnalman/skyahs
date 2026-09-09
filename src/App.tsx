import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

const Flights = lazy(() => import('@/pages/Flights'));
const Booking = lazy(() => import('@/pages/Booking'));
const Payment = lazy(() => import('@/pages/Payment'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const MyBookings = lazy(() => import('@/pages/MyBookings'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Help = lazy(() => import('@/pages/Help'));
const Careers = lazy(() => import('@/pages/Careers'));
const Blog = lazy(() => import('@/pages/Blog'));
const Admin = lazy(() => import('@/pages/Admin'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-16" role="status" aria-label="Seite wird geladen">
      <svg className="h-8 w-8 animate-spin text-navy-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meine-buchungen" element={<MyBookings />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/hilfe" element={<Help />} />
          <Route path="/karriere" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/agb" element={<Legal page="agb" />} />
          <Route path="/datenschutz" element={<Legal page="datenschutz" />} />
          <Route path="/cookie-richtlinie" element={<Legal page="cookies" />} />
          <Route path="/barrierefreiheit" element={<Legal page="barrierefreiheit" />} />
          <Route path="/stornierung" element={<Legal page="stornierung" />} />
          <Route path="/erstattung" element={<Legal page="erstattung" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
