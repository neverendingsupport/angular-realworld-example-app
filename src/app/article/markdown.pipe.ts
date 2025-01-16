import { Pipe, PipeTransform } from '@angular/core';
import * as showdown from 'showdown';

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  private converter: showdown.Converter;

  constructor() {
    this.converter = new showdown.Converter();
  }

  async transform(content: string): Promise<string> {
    return this.converter.makeHtml(content);
  }
}
