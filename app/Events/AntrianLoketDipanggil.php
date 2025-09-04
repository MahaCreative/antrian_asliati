<?php

namespace App\Events;

use App\Models\AntrianLoket;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AntrianLoketDipanggil implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $antrianLoket;

    /**
     * Create a new event instance.
     */
    public function __construct(AntrianLoket $antrianLoket)
    {
        $this->antrianLoket = $antrianLoket;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('antrian-loket');
    }

    public function broadcastWith()
    {
        return [
            'nomor_antrian' => $this->antrianLoket->nomor_antrian,
            'loket_id' => $this->antrianLoket->loket_id,
        ];
    }
}
