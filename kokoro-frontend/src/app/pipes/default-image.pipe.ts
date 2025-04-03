import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: false
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string | undefined, fallbackUrl: string = 'assets/images/default.jpg'): string {
    return imageUrl && imageUrl.trim() !== '' ? imageUrl : fallbackUrl;
  }

}
