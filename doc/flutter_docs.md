# Code Organization

The application code is structured as follows:

## `lib/` : Application code

- **`api/`** : API-related code
  - `api_endpoints.dart`: Contains API endpoints.
  - `api_requests.dart`: Handles methods for API requests (GET, POST, DELETE)
  - **`components/`**
    - `handler_validation_request.dart`: Request validation handler component.
  - **`protocol/`**
    - `api_protocol_body.dart`: Defines the API protocol body.
  - **`routes/`**
    - `api_delete_account.dart`: Delete account route.
    - **`auth/`**
      - `api_login.dart`: Login route.
      - `api_logout.dart`: Logout route.
      - `api_register.dart`: Registration route.
      - **`oauth2/`**
        - `api_auth_github.dart`: GitHub authentication.
        - `api_auth_google.dart`: Google authentication.
      - **`manage_password/`**
        - `api_reset_password.dart`: Reset password route.
      - **`profile/`**
        - `api_username.dart`: Username management route.
      - **`services/`**
        - `api_user_services.dart`: User-related services.
  - **`storage/`**
    - `token_storage.dart`: Manages authentication token storage.

- **`components/`**
  - `bottom_navigation_bar.dart`: Reusable bottom navigation bar.
  - **`dialogs/`**
    - `custom_dialog.dart`: Custom dialog box.
  - `generic_button.dart`: Reusable generic button.
  - `image_tile_blur.dart`: Image tile with blur effect.
  - `not_implemented_alert.dart`: Alert indicating that the feature is not yet implemented.
  - `oauth2_service_box.dart`: OAuth2 service box.
  - `styled_text_field.dart`: Reusable styled text field.

- **`images/`** : Contains images used in the application.
  - `github.png`
  - `google.png`
  - `logo.png`

- `main.dart`: Application entry point.

- **`models/`** : Data models
  - `profile_data.dart`: Data model for profiles.

- **`pages/`** : Application pages (screens)
  - **`auth/`** : Authentication-related pages
    - `login_page.dart`: Login page.
    - `register_page.dart`: Registration page.
  - **`home/`** : Home-related pages
    - `profile_page.dart`: Profile page.
    - `show_oauth2_services_page.dart`: Page displaying OAuth2 services.
  - `home_page.dart`: Home page.
  - **`setting/`** : Settings-related pages
    - `about_us.dart`: Application information page.
    - `setting_page.dart`: Settings page.
  - `splash_page.dart`: Introduction or startup page.


# Adding a Route in Flutter

If you want to add a new route to your Flutter application, follow these steps:

1. **Create a New Dart File:**
   - Inside the `lib/api/routes` directory, create a new Dart file for your route, for example, `api_new_route.dart`.

2. **Define the Route Class:**
   - In `api_new_route.dart`, define a new class for your route, extending `ApiRoute` or a similar base class if you have one.

   ```dart
    class ApiRoutes {
      static String baseUrl = dotenv.env['BASE_URL'] ?? '';

      static const String signUpEmail = 'user/register/email';
      static const String loginEmail = 'user/login/email';
      static const String loginGoogle = 'user/login/google';
      static const String logout = 'user/logout';
      static const String resetPassword = 'user/reset-password';
      static const String updatePassword = 'user/update-password';
      static const String username = 'user/';
      static const String deleteAccount = 'user/';
      static const String userServices = 'user/services';
      static const String authGithub = 'auth/github';

      static const String newRoute = 'new_route';
    }
   ```

3. **Implement Route Logic:**
   - Implement the specific logic and functionality for your route inside the `ApiNewRoute` class. This could include handling requests, processing data, While using the `ApiRequests` class to make a `POST, GET, DELETE` style request.
   - Example of a `POST` request:

   ```dart
    class ApiNewRoute extends ApiRoute {
      @override

      Future<ApiResponse> post(Map<String, dynamic> body) async {

        final http.Response response = await ApiRequests.post(ApiRoutes.newRoute, body);
      }
    }
   ```

4. **Update UI or Widgets:**
   - If your new route has associated UI, create the necessary widgets in the `pages/` directory or a subdirectory and update the navigation logic accordingly.
   - Example of a api_login : 
    ``` dart
    ApiLogin.login(
                              emailController.text, passwordController.text)
                          .then((statusCode) {
                        HandlerValidationRequest.showMessage(
                            context, statusCode, 'Login', '/home');
                      });
    ```
