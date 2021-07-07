import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/privacy" />
    <Route path="/terms" />
    <Route path="/login" />
    <Route path="/signup" />
    <Route path="/:username" />
    <Route path="/:username/achievements" />
    <Route path="/:username/experience" />
    <Route path="/:username/gear" />
    <Route path="/:username/games" />
    <Route path="/:username/followers" />
    <Route path="/:username/following" />
  </Route>
);
