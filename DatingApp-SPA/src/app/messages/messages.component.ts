import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { error } from 'protractor';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessages(id: number) {
    this.alertify.confirm(
      'Are you sure you want to delete this message?',
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(this.messages.findIndex((m) => m.id === id));
              this.alertify.success('Message has been deleted.');
            },
            (error) => {
              this.alertify.error(error);
            }
          );
      }
    );
  }
}
