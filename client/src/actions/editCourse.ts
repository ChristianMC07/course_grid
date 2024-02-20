/**
 * Sends a PUT request to the server to update a course.
 *
 * @param {string} id - The ID of the course to update.
 * @param {object} courseData - The updated data for the course.
 * @returns {Promise<Response>} - The response from the server.
 */
export async function editCourse(id: string, courseData: object): Promise<Response> {
    try {
      const response = await fetch(`/api/courses/put/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to update course:', error);
      throw error;
    }
  }
  