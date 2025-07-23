"use client";

import { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useUserDetailContext } from "@/app/Context/userDetailContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createUserIfNotExists = async () => {
      // Get the currently logged-in Supabase auth user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error(
          "Failed to fetch auth user:",
          userError?.message || "No user found"
        );
        return;
      }

      // Check if the user exists in the Users table
      const { data: existingUsers, error: fetchError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (fetchError) {
        console.error("Error checking user in DB:", fetchError.message);
        return;
      }

      let dbUser = null;

      // If the user does not exist, insert them
      if (!existingUsers || existingUsers.length === 0) {
        const { data: insertedUsers, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.user_metadata.name,
              email: user.email,
              picture: user.user_metadata.picture,
            },
          ])
          .select(); // This will return the newly inserted row(s)

        if (insertError) {
          console.error("Error inserting new user:", insertError.message);
          return;
        }

        dbUser = insertedUsers[0];
        console.log("✅ New user inserted:", dbUser);
      } else {
        dbUser = existingUsers[0];
        console.log("ℹ️ User already exists:", dbUser);
      }

      // Store the DB user in state
      setUser(dbUser);
    };

    createUserIfNotExists();
  }, []);

  return (
    <>
      <useUserDetailContext.Provider value={{ user, setUser }}>
        {children}
      </useUserDetailContext.Provider>
    </>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(useUserDetailContext);
  return context;
};
