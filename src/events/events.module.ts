import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventsService } from './user-events.service';

@Module({
    imports : [
      EventEmitterModule.forRoot({
        global : true,
        wildcard : false,
        maxListeners : 20,
        verboseMemoryLeak : true
      })
    ],

    providers : [
      UserEventsService
    ],
    exports : [UserEventsService]
})
export class EventsModule {}
