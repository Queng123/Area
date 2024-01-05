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
        - `api_delete_account.dart`: Delete account route.
        - `api_username.dart`: Username management route.
      - **`reaction/`**
        - `api_reaction.dart`: Reaction route.
      - **`services/`**
        - `api_user_services.dart`: User-related services.
  - **`storage/`**
    - `token_storage.dart`: Manages authentication token storage.

- **`components/`**
  - `bottom_navigation_bar.dart`: Reusable bottom navigation bar.
  - **`build_text_dashboard.dart`**
  - `copy_area_card.dart`
  - **`dialogs/`**
    - `custom_dialog.dart`: Custom dialog box.
  - `fake_user_profile.dart`: Fake user profile.
  - `generic_button.dart`: Reusable generic button.
  - `image_tile_blur.dart`: Image tile with blur effect.
  - `mini_dashboard.dart`: Mini dashboard.
  - `not_implemented_alert.dart`: Alert indicating that the feature is not yet implemented.
  - `oauth2_service_box.dart`: OAuth2 service box.
  - `styled_text_field.dart`: Reusable styled text field.

- **`images/`** : Contains images used in the application.
  - `config2.jpeg`
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
  - **`copyarea/`**
    - `copy_area_page.dart`
  - **`home/`** : Home-related pages
    - `dashboard_page.dart`: Dashboard page.
    - `profile_page.dart`: Profile page.
    - `show_oauth2_services_page.dart`: Page displaying OAuth2 services.
  - `home_page.dart`: Home page.
  - **`setting/`** : Settings-related pages
    - `onboarding_page.dart`: Onboarding page.
    - `setting_page.dart`: Settings page.
  - `splash_page.dart`: Introduction or startup page.

23 directories, 45 files

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
    ```dart
     ApiLogin.login(
         emailController.text, passwordController.text)
         .then((statusCode) {
       HandlerValidationRequest.showMessage(
           context, statusCode, 'Login', '/home');
     });
    ```

5. **Add Provider:**
    - If your new route has associated data, create a new provider in the `api/routes/auth/oauth2` directory and update the `providers.dart` file to include your new provider.
    - Example of a provider : 
      ```dart
      class ApiGitHub {
        static String clientID = dotenv.env['CLIENT_ID'] ?? '';
        static String clientSCOPE = dotenv.env['CLIENT_SCOPE'] ?? '';

        Future<void> authenticateWithGitHub() async {
          if (clientID.isEmpty) {
            throw 'Missing GitHub client ID or client secret';
          }

          final authCallbackURL =
              Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authGithub);

          final String link =
              '${ApiRoutes.authorizeGithub}client_id=$clientID&redirect_uri=$authCallbackURL&scope=$clientSCOPE';
          Uri uri = Uri.parse(link);
          if (!await launchUrl(uri)) {
            throw 'Could not launch $link';
          }
        }
      }
      ```
    - Components OAuth2ServiceBox will create the design for the future provider with a switch for on/off functionality. In the `show_oauth2_services_page` class, it will be necessary to add a name and an image to the list of providers.
    - Example of a list of providers :
      ```dart
      List myOAuth2Services = [
        ["Github", "lib/images/github.png"],
        ["Google", "lib/images/google.png"],
        ["Discord", "lib/images/google.png"],
        ["Steam", "lib/images/google.png"],
      ];
      ```

      The rest will be handled automatically.

6. **Add Action & Reaction:**
    - If it's a simple action and reaction, there is no need to handle it in the front-end, as it will be directly added to the lists of actions and reactions planned in the dashboard components.