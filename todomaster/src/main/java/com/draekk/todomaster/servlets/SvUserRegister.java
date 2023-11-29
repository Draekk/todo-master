
package com.draekk.todomaster.servlets;

import com.draekk.todomaster.controllers.GeneralController;
import com.draekk.todomaster.models.User;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet(name = "SvUserRegister", urlPatterns = {"/SvUserRegister"})
public class SvUserRegister extends HttpServlet {
    
    GeneralController gc = new GeneralController();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
                
        
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        String name = request.getParameter("name");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        User user = gc.processUser(name, lastName, email, username, password);
        
        if(user != null){
            response.sendRedirect("login.html?message=User+registered+successfully");
        } else {
            response.sendRedirect("register.html?message=User+registered+successfully");
   
        }
        
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    
}
