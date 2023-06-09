import supabase from "./supabase";

const getCurrentUser = async () => {
  // debugger;
  const session = await supabase.auth.getSession();
  // console.log(session);
  if (session?.data?.session?.user) {
    const { data: bargeMeta, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    const todoList = await getLists(session.data.session.user.id);

    const user = {
      ...session.data.session.user,
      bargeMeta,
      todoList,
    };

    // console.log(user.bargeMeta.slug);

    return {
      success: true,
      data: user,
    };
  }
  return {
    success: true,
    data: null,
  };
};

const getUserBySlug = async (slug) => {
  //debugger;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const listRequestData = {
  data: null,
};

const getLists = async (owner) => {
  //debugger;
  if (listRequestData.data) {
    return listRequestData.data;
  }

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("owner", owner);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  listRequestData.data = { success: true, data };

  return { success: true, data };
};

const deleteList = async (listId) => {
  const deleteResponse = await supabase
    .from("lists")
    .delete("*")
    .eq("id", listId);

  if (deleteResponse.error) {
    return {
      success: false,
      error: deleteResponse.error,
    };
  }

  return {
    success: true,
    message: "deleted successfully",
    data: deleteResponse.data,
  };
};

const addNewList = async (title, description, owner, list) => {
  // listRequestData.data = null;
  const addResponse = await supabase.from("lists").insert({
    title,
    description,
    owner,
    list,
  });

  if (addResponse.error) {
    return {
      success: false,
      error: addResponse.error,
    };
  }

  return {
    success: true,
    message: "added successfully",
    data: addResponse.data,
  };
};

const updateList = async (id, title, description, owner, list) => {
  // listRequestData.data = null;
  const updateResponse = await supabase
    .from("lists")
    .update({
      title,
      description,
      owner,
      list,
    })
    .eq("id", id);

  if (updateResponse.error) {
    return {
      success: false,
      error: updateResponse.error,
    };
  }

  return {
    success: true,
    message: "updated successfully",
    data: updateResponse.data,
  };
};

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

const getTenListsAllUsers = async () => {
  const { data, error } = await supabase
  .from("lists")
  .select("*")
  .order("id", { ascending: false })
  .limit(10);
  if(error) {
    return {
      success: false,
      error,
    }
  }

  return {
    success: true,
    data,
  }
}

const loginUser = async (email, password) => {
  // debugger;
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(authResponse);
  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase
      .from("users")
      .select("*")
      .eq("user_id", authResponse.data.user.id);

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
    error: {
      message: "An unknown error has occurred",
    },
  };
};

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};

export {getTenListsAllUsers, updateList, registerUser, loginUser, getCurrentUser, getLists, addNewList, logoutUser, getUserBySlug, deleteList };
