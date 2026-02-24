package com.taskmanager;

import org.springframework.data.jpa.repository.JpaRepository;

// Data access layer
// This interface is used for User to be able to actually post data to the database.
// <Class this interface references, Datatype of PK>
public interface UserRepo extends JpaRepository<User, Long> {}