import React from 'react';
import HeroSlider from '../../Components/HeroSlider';
import PublicHabits from '../../Components/publicHabit';
import WhyBuildHabits from '../../Components/WhyBuildHabits';
import UserFeedback from '../../Components/UserFeedback';
import MotivationalSection from '../../Components/MotivationalSection';



const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <PublicHabits></PublicHabits>
            <WhyBuildHabits></WhyBuildHabits>
            <MotivationalSection></MotivationalSection>
            <UserFeedback></UserFeedback>
        </div>
    );
};

export default Home;