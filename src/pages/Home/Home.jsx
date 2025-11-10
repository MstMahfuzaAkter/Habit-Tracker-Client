import React from 'react';
import HeroSlider from '../../Components/HeroSlider';
import PublicHabits from '../../Components/publicHabit';
import WhyBuildHabits from '../../Components/WhyBuildHabits';
import ProgressState from '../../Components/ProgressStats';
import UserFeedback from '../../Components/UserFeedback';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <PublicHabits></PublicHabits>
            <WhyBuildHabits></WhyBuildHabits>
            <ProgressState></ProgressState>
            <UserFeedback></UserFeedback>
        </div>
    );
};

export default Home;