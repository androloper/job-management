import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
const NGSW_CUSTOM_PARAM = 'ngsw-bypass';
@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }
    set refreshToken(token: string)
    {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string
    {
        return localStorage.getItem('refreshToken') ?? '';
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { client_id:string,username: string; password: string,client_secret:string,grant_type:string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        let body = new URLSearchParams();
        body.set('username', 'ahmet@gmail.com');
        body.set('password', 'Password.123');
        body.set('grant_type', "password");
        body.set('client_id', "Vue-Client");
        body.set('client_secret', "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0");

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }),
        };


        return this._httpClient.post('http://izersoft.online/connect/token',body.toString(),httpOptions).pipe(
            switchMap((response: any) => {
                console.log(response);
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.refreshToken = response.refresh_token;
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
              /*  setTimeout(async () => {
                    this.signInUsingToken().subscribe(
                        (res)=>{
                            this.accessToken = res.access_token;
                            this.refreshToken = res.refresh_token;
                            },
                            error => {console.log(error)});

                }, 15000)
*/
                return of(response);
            })
        );
    }




    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('grant_type', "refresh_token");
        body.set('client_id', "Vue-Client");
        body.set('client_secret', "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0");
        body.set('refresh_token',this.refreshToken);
        console.log("REFRESH TOKEN : "+ this.refreshToken);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        };


        // Renew token
        return this._httpClient.post('http://izersoft.online/connect/token', body.toString(),httpOptions).pipe(
            catchError((err) =>
                // Return false

                of(false)

            ),
            switchMap((response: any) => {
                console.log("HELLO");
                console.log(response);
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.refreshToken = response.refresh_token;
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
