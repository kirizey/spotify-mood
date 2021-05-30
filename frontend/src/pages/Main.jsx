import React from 'react';
import Fade from '../animations/Fade';
import Categories from '../components/Categories';

export default function Main() {
  return (
    <Fade>
      <Categories />
    </Fade>
  );
}
