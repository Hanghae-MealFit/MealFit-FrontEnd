import React from 'react'
import axios from 'axios'

const Instance = axios.create({
  baseURL: 'http://43.200.174.111:8080/',
  headers: { "Content-Type": "application/json" },
});

export default Instance