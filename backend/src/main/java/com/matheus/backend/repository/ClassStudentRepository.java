package com.matheus.backend.repository;

import com.matheus.backend.domain.ClassStudent;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassStudentRepository extends CrudRepository<ClassStudent, Integer> {

	/* Usable to know how much students is subscribed in the class */
	@Query(value="SELECT count(*) FROM Conquer.classes_students WHERE classID = :id",nativeQuery=true)
	int countByClas(@Param("id")int id);

	/* Usable to know if the student already is subscribed in the class */
	@Query(value="SELECT count(*) FROM Conquer.classes_students WHERE classID = :classId AND studentId = :studentId",nativeQuery=true)
	int countClassesStudents(@Param("classId")int classId, @Param("studentId")int studentId);

}