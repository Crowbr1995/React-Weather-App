import { useState, useEffect } from 'react';

export const capitalize = (desc) => {
  return desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const formatTemp = (temp, unit) => {
  return unit === 'Fahrenheit' ? `${Math.round(temp * 9/5 -459.67)}°F` : `${Math.round(temp - 273.15)}°C`; 
};

export const getWindDirection = (degree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const index = Math.round(degree / 45) % 8;

  return directions[index];
};

