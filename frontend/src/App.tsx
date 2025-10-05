import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/landing/sections/header";
import { TunisiaSection } from "@/landing/sections/tunisia";
import { ChatWidget } from "@/utilities/chatbot";
import { MeetTheAgents } from "@/landing/sections/agents";
import { Footer } from "@/landing/sections/footer";
import Page from "@/dashboard/dashboard";
import {StartupIntakeForm} from "@/components/startupIntakeForm";
import {Ecosystem} from "@/dashboard/ecosystem";
import {LegalIntakeForm} from "@/components/legalntakeForm";
import {Legal} from "@/dashboard/legal";
import Critic from "@/dashboard/criticing";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <TunisiaSection />
                            <ChatWidget />
                            <MeetTheAgents />
                            <Footer />
                        </>
                    }
                />
                <Route path="/dashboard" element={
                    <>
                    <Page />
                    <ChatWidget />
                    </>
                } />
                <Route path="/form" element={
                    <>
                    <StartupIntakeForm />
                    </>
                } />
                <Route path="/legalform" element={
                    <>
                        <Legal />
                    </>
                } />
                <Route path="/ecosystem" element={
                    <>
                    <Ecosystem />
                    </>
                } />
                <Route path="/critic" element={
                    <>
                        <Critic />
                    </>
                } />

            </Routes>
        </Router>
    );
}

export default App;
