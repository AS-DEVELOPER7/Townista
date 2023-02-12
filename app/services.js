import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const townista = createApi({
  reducerPath: "townista",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-advisor.p.rapidapi.com/",
  }),
  endpoints: (builder) => ({
    // ------------------------
    // search
    // ------------------------
    search: builder.query({
      query: ({ value, sort }) => ({
        url: `locations/search`,
        method: "GET",
        params: {
          query: value,
          limit: "30",
          offset: "0",
          units: "km",
          currency: "INR",
          sort: sort,
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),

    // ---------------------
    // home
    // ---------------------
    hotels_by_location: builder.query({
      query: ({ lat, lang }) => ({
        url: `hotels/list-by-latlng`,
        method: "GET",
        params: {
          latitude: lat,
          longitude: lang,
          lang: "en_US",
          limit: "30",
          currency: "INR",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    restaurant_by_location: builder.query({
      query: ({ lat, lang }) => ({
        url: `restaurants/list-by-latlng`,
        method: "GET",
        params: {
          latitude: lat,
          longitude: lang,
          limit: "30",
          currency: "INR",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    tourist_place_by_location: builder.query({
      query: ({ lat, lang }) => ({
        url: `attractions/list-by-latlng`,
        method: "GET",
        params: {
          latitude: lat,
          longitude: lang,
          limit: "30",
          currency: "INR",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // ---------------------
    // Details
    // ---------------------
    restaurant_details: builder.query({
      query: (locationID) => ({
        url: `restaurants/get-details`,
        method: "GET",
        params: { location_id: locationID, currency: "INR", lang: "en_US" },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    hotel_details: builder.query({
      query: (locationID) => ({
        url: `hotels/get-details`,
        method: "GET",
        params: { location_id: locationID, lang: "en_US", currency: "INR" },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    tourist_place_details: builder.query({
      query: (locationID) => ({
        url: `attractions/get-details`,
        method: "GET",
        params: { location_id: locationID, currency: "INR", lang: "en_US" },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // --------------------
    // reviews
    // --------------------
    reviews: builder.query({
      query: (locationID) => ({
        url: `reviews/list`,
        method: "GET",
        params: {
          location_id: locationID,
          currency: "INR",
          limit: "20",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // --------------------
    // tips
    // --------------------
    tips: builder.query({
      query: (locationID) => ({
        url: `tips/list`,
        method: "GET",
        params: {
          location_id: locationID,
          limit: "20",
          currency: "INR",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // --------------------
    // photos
    // --------------------
    photos: builder.query({
      query: (locationID) => ({
        url: `photos/list`,
        method: "GET",
        params: {
          location_id: locationID,
          limit: "50",
          currency: "INR",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // --------------------
    // questions
    // --------------------
    questions: builder.query({
      query: (locationID) => ({
        url: `questions/list`,
        method: "GET",
        params: {
          location_id: locationID,
          limit: "10",
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
    // --------------------
    // answers
    // --------------------
    answers: builder.query({
      query: (questionID) => ({
        url: `answers/list`,
        method: "GET",
        params: {
          question_id: questionID,
        },
        headers: {
          "X-RapidAPI-Key":
            "bf7b99e631mshd4fce505975ffdfp1af3bfjsn78d2761ef42b",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }),
    }),
  }),
});
export const {
  useSearchQuery,
  useRestaurant_by_locationQuery,
  useHotels_by_locationQuery,
  useTourist_place_by_locationQuery,
  useHotel_detailsQuery,
  useRestaurant_detailsQuery,
  useTourist_place_detailsQuery,
  useTipsQuery,
  usePhotosQuery,
  useQuestionsQuery,
  useReviewsQuery,
  useAnswersQuery,
} = townista;
