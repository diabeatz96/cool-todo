import supabase from "./supabase";

const registerUser = async (name, email, password, slug) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("slug", slug);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  if (data.length > 0) {
    return {
      success: false,
      message: "Slug already exists",
    };
  }
  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });


  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error.message,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("users")
      .insert([{ user_id: authResponse.data.user.id, name, slug }]);
    if (addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message,
      };
    }
    return {
      success: true,
      message: "Registration complete! Redirecting...",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred!!",
  };
};

const loginUser = async (email, password) => {
  debugger;
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(authResponse);
  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase.from("profile").select("*").eq("user_id", authResponse.data.user.id);

    if (meta.error) {
      return {
        success: false,
        message: meta.error,
      };
    }

    return {
      ...authResponse,
      meta,
      success: true,
    };
  }
  return {
    success: false,
    message: "An unknown error has occurred",
  };
};

export { registerUser, loginUser };
